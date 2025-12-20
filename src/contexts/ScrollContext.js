import React, { createContext, useContext, useState, useCallback } from 'react';
import { Animated } from 'react-native';

const ScrollChannelContext = createContext(null);

/**
 * Scroll channel structure:
 * {
 *   scrollY: Animated.Value,
 *   isCollapsed: Animated.Value (derived from scrollY > threshold, returns 0 or 1)
 * }
 */

export const useScrollChannelContext = () => {
  const context = useContext(ScrollChannelContext);
  if (!context) {
    // Return a no-op context if not available (for screens that don't need it)
    return {
      activeScrollChannel: null,
      setActiveScrollChannel: () => {},
      clearActiveScrollChannel: () => {},
    };
  }
  return context;
};

// Legacy export for backward compatibility during migration
export const useScrollContext = () => {
  console.warn('useScrollContext is deprecated. Use useScrollChannelContext instead.');
  return useScrollChannelContext();
};

export const ScrollChannelProvider = ({ children }) => {
  const [activeScrollChannel, setActiveScrollChannelState] = useState(null);

  const setActiveScrollChannel = useCallback((channel) => {
    setActiveScrollChannelState(channel);
  }, []);

  const clearActiveScrollChannel = useCallback(() => {
    setActiveScrollChannelState(null);
  }, []);

  const value = {
    activeScrollChannel,
    setActiveScrollChannel,
    clearActiveScrollChannel,
  };

  return (
    <ScrollChannelContext.Provider value={value}>
      {children}
    </ScrollChannelContext.Provider>
  );
};

// Legacy export for backward compatibility during migration
export const ScrollProvider = ScrollChannelProvider;

