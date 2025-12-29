import { useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useScrollContext } from '../contexts/ScrollContext';

export const useAnimatedScroll = (screenName) => {
  const { registerScrollY } = useScrollContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    registerScrollY(screenName, scrollY);
    return () => {
      scrollY.setValue(0);
    };
  }, [screenName]);

  const onScroll = useCallback(
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true }
    ),
    [scrollY]
  );

  return { scrollY, onScroll };
};

