import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useScrollContext } from '../contexts/ScrollContext';

/**
 * HOC that automatically wraps a screen and tracks scroll position
 * This makes scroll tracking completely automatic with zero screen code
 */
export const withScrollTracking = (WrappedComponent) => {
  return (props) => {
    const route = useRoute();
    const { registerScrollY } = useScrollContext();
    const scrollYRef = useRef(new Animated.Value(0)).current;
    const screenName = route.name;

    useEffect(() => {
      // Only register if screen name exists and context is available
      if (screenName && registerScrollY) {
        registerScrollY(screenName, scrollYRef);
        return () => {
          scrollYRef.setValue(0);
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenName]);

    // Inject scroll tracking props into the component
    // The component can use these if it wants, but it's optional
    return <WrappedComponent {...props} _scrollY={scrollYRef} _screenName={screenName} />;
  };
};

