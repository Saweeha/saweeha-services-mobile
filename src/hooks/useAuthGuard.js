import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthModal } from '../store/authSlice';

// Protected routes configuration
export const PROTECTED_ROUTES = {
  // Tab routes
  'Bookings': true,
  'Favorites': true,
  // Stack routes
  'Notifications': true,
  'BookingDateTime': true,
};

/**
 * Hook to guard a screen - shows auth modal if not authenticated
 * Call this in protected screens
 */
export const useAuthGuard = (routeName) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated && PROTECTED_ROUTES[routeName]) {
        // Prevent navigation if not authenticated
        dispatch(showAuthModal({ routeName, type: 'login' }));
        // Navigate back to home if trying to access protected route
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('MainTabs', { screen: 'Home' });
        }
      }
    }, [isAuthenticated, routeName, dispatch, navigation])
  );
};

/**
 * Hook to intercept navigation attempts to protected routes
 * Returns a function that checks auth before navigating
 */
export const useProtectedNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const navigate = (routeName, params) => {
    if (PROTECTED_ROUTES[routeName] && !isAuthenticated) {
      dispatch(showAuthModal({ routeName, type: 'login' }));
      return false; // Block navigation
    }
    navigation.navigate(routeName, params);
    return true;
  };

  return { navigate, isAuthenticated };
};

