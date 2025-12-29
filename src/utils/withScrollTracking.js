import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useScrollContext } from '../contexts/ScrollContext';

export const withScrollTracking = (WrappedComponent) => {
  return (props) => {
    const route = useRoute();
    const { registerScrollY } = useScrollContext();
    const scrollYRef = useRef(new Animated.Value(0)).current;
    const screenName = route.name;

    useEffect(() => {
      if (screenName && registerScrollY) {
        registerScrollY(screenName, scrollYRef);
        return () => {
          scrollYRef.setValue(0);
        };
      }
    }, [screenName]);

    return <WrappedComponent {...props} _scrollY={scrollYRef} _screenName={screenName} />;
  };
};

