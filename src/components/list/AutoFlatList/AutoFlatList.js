import React, { useRef, useMemo } from 'react';
import { Animated, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useScrollChannelContext } from '../../contexts/ScrollContext';

const AutoFlatList = ({ onScroll, threshold = 100, ...props }) => {
  const { setActiveScrollChannel, clearActiveScrollChannel } = useScrollChannelContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollChannel = useMemo(() => {
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

  useFocusEffect(
    React.useCallback(() => {
      setActiveScrollChannel(scrollChannel);

      return () => {
        clearActiveScrollChannel();
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
    <Animated.FlatList
      {...props}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
};

export default AutoFlatList;

