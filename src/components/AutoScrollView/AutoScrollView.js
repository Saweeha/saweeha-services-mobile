import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useScrollContext } from '../../contexts/ScrollContext';

/**
 * AutoScrollView - Automatically registers scroll position for animated headers
 * Screens can use this instead of Animated.ScrollView with zero config
 * If screenName is not provided, it automatically detects from route
 */
const AutoScrollView = ({ screenName, children, onScroll, ...props }) => {
  const route = useRoute();
  const { registerScrollY } = useScrollContext();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Auto-detect screen name from route if not provided
  const actualScreenName = screenName || route?.name;

  useEffect(() => {
    if (actualScreenName && registerScrollY) {
      registerScrollY(actualScreenName, scrollY);
      return () => {
        scrollY.setValue(0);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualScreenName]);

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
