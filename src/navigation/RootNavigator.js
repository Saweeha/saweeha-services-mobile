import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import BusinessScreen from '../screens/BusinessScreen';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import AnimatedHeader from '../components/AnimatedHeader/AnimatedHeader';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => {
        // Check if this screen needs an animated header
        const needsAnimatedHeader = route.name === 'Business';
        
        return {
          headerShown: true,
          headerTransparent: needsAnimatedHeader,
          header: ({ options }) => {
            if (needsAnimatedHeader) {
              return (
                <AnimatedHeader
                  screenName={route.name}
                  title={options.title || route.name}
                  onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
                  showBackButton={navigation.canGoBack()}
                  rightComponent={options.headerRight}
                  threshold={100}
                />
              );
            }
            
            return (
              <CustomHeader
                title={options.title || route.name}
                onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
                showBackButton={navigation.canGoBack()}
                rightComponent={options.headerRight}
              />
            );
          },
          headerShadowVisible: false,
        };
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ 
          title: 'Notifications',
        }}
      />
      <Stack.Screen 
        name="Business" 
        component={BusinessScreen}
        options={({ route }) => {
          const businessName = route.params?.business?.name || 'Business';
          return {
            title: businessName,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
