import { useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useScrollContext } from '../contexts/ScrollContext';

/**
 * Hook for screens to register their scroll position for animated header
 * @param {string} screenName - The name of the screen (should match route name)
 * @returns {Object} - { scrollY, onScroll } - scrollY is the Animated.Value, onScroll is the handler
 */
export const useAnimatedScroll = (screenName) => {
  const { registerScrollY } = useScrollContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    registerScrollY(screenName, scrollY);
    return () => {
      // Reset scroll position when unmounting
      scrollY.setValue(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

