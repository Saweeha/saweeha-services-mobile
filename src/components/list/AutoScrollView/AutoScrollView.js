import React, { useRef, useMemo } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useScrollChannelContext } from '../../../contexts/ScrollContext';

/**
 * AutoScrollView - Automatically registers scroll position for animated headers
 * Screens can use this instead of Animated.ScrollView with zero config
 * 
 * This component:
 * - Creates its own scrollY animated value
 * - Detects focus using useFocusEffect
 * - Registers itself as the active scroll channel ON FOCUS
 * - Unregisters ON BLUR / UNMOUNT
 * 
 * It does NOT:
 * - Know anything about headers
 * - Reference navigation options
 * - Reference route names
 */
const AutoScrollView = ({ children, onScroll, threshold = 100, ...props }) => {
  const { setActiveScrollChannel, clearActiveScrollChannel } = useScrollChannelContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Create scroll channel with scrollY and derived isCollapsed value
  const scrollChannel = useMemo(() => {
    // isCollapsed: 0 when scrollY < threshold, 1 when scrollY >= threshold
    const isCollapsed = scrollY.interpolate({
      inputRange: [0, threshold, threshold + 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return {
      scrollY,
      isCollapsed,
    };
  }, [scrollY, threshold]);

  // Register/unregister on focus/blur
  useFocusEffect(
    React.useCallback(() => {
      // Register as active channel when screen gains focus
      setActiveScrollChannel(scrollChannel);

      return () => {
        // Clear active channel when screen loses focus
        clearActiveScrollChannel();
        // Reset scroll position
        scrollY.setValue(0);
      };
    }, [scrollChannel, setActiveScrollChannel, clearActiveScrollChannel, scrollY])
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: onScroll,
    }
  );

  return (
    <Animated.ScrollView
      {...props}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default AutoScrollView;
