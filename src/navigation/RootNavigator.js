import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import BusinessScreen from '../screens/BusinessScreen';
import BookingDateTimeScreen from '../screens/BookingDateTimeScreen';
import { getHeaderOptions } from './headerConfig';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => getHeaderOptions(navigation, route)}
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
        options={{
          // Title is read dynamically from route.params in headerConfig
          // This ensures reactive updates when route params change
          title: 'Business',
        }}
      />
      <Stack.Screen 
        name="BookingDateTime" 
        component={BookingDateTimeScreen}
        options={{
          title: 'Select Date & Time',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
