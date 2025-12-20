import React, { createContext, useContext, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

const ScrollContext = createContext(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    // Return a no-op context if not available (for screens that don't need it)
    return {
      getScrollY: () => new Animated.Value(0),
      registerScrollY: () => {},
    };
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const scrollYRefs = useRef({});

  const getScrollY = useCallback((screenName) => {
    // If not registered yet, create a new one (header might render before screen)
    // Screen's registerScrollY will replace it with the actual scrollY instance
    if (!scrollYRefs.current[screenName]) {
      scrollYRefs.current[screenName] = new Animated.Value(0);
    }
    return scrollYRefs.current[screenName];
  }, []);

  const registerScrollY = useCallback((screenName, scrollY) => {
    // Replace the placeholder with the actual scrollY from the screen
    scrollYRefs.current[screenName] = scrollY;
  }, []);

  const value = {
    getScrollY,
    registerScrollY,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

