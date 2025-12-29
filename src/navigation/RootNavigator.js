import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthModal } from '../store/authSlice';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import BusinessScreen from '../screens/BusinessScreen';
import BookingDateTimeScreen from '../screens/BookingDateTimeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import AboutScreen from '../screens/AboutScreen';
import FAQScreen from '../screens/FAQScreen';
import BusinessListScreen from '../screens/BusinessListScreen';
import { getHeaderOptions } from './headerConfig';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => {
        const originalNavigate = navigation.navigate;
        navigation.navigate = (screenName, params) => {
          const protectedRoutes = {
            Notifications: true,
            BookingDateTime: true,
            EditProfile: true,
          };

          if (protectedRoutes[screenName] && !isAuthenticated) {
            dispatch(showAuthModal({ routeName: screenName, type: 'login' }));
            return;
          }
          return originalNavigate(screenName, params);
        };

        return getHeaderOptions(navigation, route);
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
        options={{
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
      <Stack.Screen
        name="BusinessList"
        component={BusinessListScreen}
        options={{
          title: 'All Businesses',
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          title: 'FAQs',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
