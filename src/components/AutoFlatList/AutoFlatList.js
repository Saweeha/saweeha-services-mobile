import React, { useRef, useEffect } from 'react';
import { Animated, FlatList } from 'react-native';
import { useScrollContext } from '../../contexts/ScrollContext';

/**
 * AutoFlatList - Automatically registers scroll position for animated headers
 * Screens can use this instead of FlatList with zero config
 */
const AutoFlatList = ({ screenName, onScroll, ...props }) => {
  const { registerScrollY } = useScrollContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (screenName) {
      registerScrollY(screenName, scrollY);
      return () => {
        scrollY.setValue(0);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenName]);

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

