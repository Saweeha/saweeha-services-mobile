import React from 'react';
import CustomHeader from '../components/layout/CustomHeader/CustomHeader';
import AnimatedHeader from '../components/layout/AnimatedHeader/AnimatedHeader';

export const ANIMATED_HEADER_SCREENS = ['Business'];

export const shouldUseAnimatedHeader = (routeName) => {
  return ANIMATED_HEADER_SCREENS.includes(routeName);
};

export const getHeaderComponent = (route, navigation, options) => {
  const routeName = route.name;
  const needsAnimatedHeader = shouldUseAnimatedHeader(routeName);

  const getTitle = () => {
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

export const getHeaderOptions = (navigation, route) => {
  const needsAnimatedHeader = shouldUseAnimatedHeader(route.name);

  return {
    headerShown: true,
    headerTransparent: needsAnimatedHeader,
    headerShadowVisible: false,
    header: ({ options }) => getHeaderComponent(route, navigation, options),
  };
};

