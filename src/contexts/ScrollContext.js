import React, { createContext, useContext, useState, useCallback } from 'react';
import { Animated } from 'react-native';

const ScrollChannelContext = createContext(null);

export const useScrollChannelContext = () => {
  const context = useContext(ScrollChannelContext);
  if (!context) {
    return {
      activeScrollChannel: null,
      setActiveScrollChannel: () => { },
      clearActiveScrollChannel: () => { },
    };
  }
  return context;
};

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

export const ScrollProvider = ScrollChannelProvider;

