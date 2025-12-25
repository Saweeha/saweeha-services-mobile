import React from 'react';
import CustomHeader from '../components/layout/CustomHeader/CustomHeader';
import AnimatedHeader from '../components/layout/AnimatedHeader/AnimatedHeader';

/**
 * List of screen names that should use animated headers
 */
export const ANIMATED_HEADER_SCREENS = ['Business'];

/**
 * Check if a screen should use an animated header
 */
export const shouldUseAnimatedHeader = (routeName) => {
  return ANIMATED_HEADER_SCREENS.includes(routeName);
};

/**
 * Get header component for a route
 * This centralizes all header configuration logic
 * Reads title from route.params if available (for dynamic updates)
 */
export const getHeaderComponent = (route, navigation, options) => {
  const routeName = route.name;
  const needsAnimatedHeader = shouldUseAnimatedHeader(routeName);

  // Get title from route.params (for dynamic updates) or options.title or routeName
  const getTitle = () => {
    // For Business screen, check route.params.business.name
    if (routeName === 'Business' && route.params?.business?.name) {
      return route.params.business.name;
    }
    return options.title || routeName;
  };

  const title = getTitle();

  if (needsAnimatedHeader) {
    return (
      <AnimatedHeader
        title={title}
        onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        showBackButton={navigation.canGoBack()}
        rightComponent={options.headerRight}
        threshold={100}
      />
    );
  }

  return (
    <CustomHeader
      title={title}
      onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      showBackButton={navigation.canGoBack()}
      rightComponent={options.headerRight}
    />
  );
};

/**
 * Get header options for a route
 * Used in screenOptions
 */
export const getHeaderOptions = (navigation, route) => {
  const needsAnimatedHeader = shouldUseAnimatedHeader(route.name);

  return {
    headerShown: true,
    headerTransparent: needsAnimatedHeader,
    headerShadowVisible: false,
    header: ({ options }) => getHeaderComponent(route, navigation, options),
  };
};

