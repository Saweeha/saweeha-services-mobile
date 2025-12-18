import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import CustomHeader from '../components/CustomHeader/CustomHeader';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        header: ({ options }) => (
          <CustomHeader
            title={options.title || route.name}
            onBackPress={navigation.canGoBack() ? () => navigation.goBack() : undefined}
            showBackButton={navigation.canGoBack()}
          />
        ),
        headerShadowVisible: false,
        headerTransparent: false,
      })}
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
    </Stack.Navigator>
  );
};

export default RootNavigator;
