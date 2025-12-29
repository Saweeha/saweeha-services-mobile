import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthModal } from '../store/authSlice';

export const PROTECTED_ROUTES = {
  Bookings: true,
  Favorites: true,
  Notifications: true,
  BookingDateTime: true,
  EditProfile: true,
};

export const useAuthGuard = (routeName) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated && PROTECTED_ROUTES[routeName]) {
        dispatch(showAuthModal({ routeName, type: 'login' }));
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('MainTabs', { screen: 'Home' });
        }
      }
    }, [isAuthenticated, routeName, dispatch, navigation])
  );
};

export const useProtectedNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const navigate = (routeName, params) => {
    if (PROTECTED_ROUTES[routeName] && !isAuthenticated) {
      dispatch(showAuthModal({ routeName, type: 'login' }));
      return false;
    }
    navigation.navigate(routeName, params);
    return true;
  };

  return { navigate, isAuthenticated };
};

