import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store/store';
import { showAuthModal, setHasShownLaunchModal, checkAuthStatus } from './src/store/authSlice';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { ScrollProvider } from './src/contexts/ScrollContext';
import LoginModal from './src/components/modals/AuthModal/LoginModal';
import RegisterModal from './src/components/modals/AuthModal/RegisterModal';
import ForgotPasswordModal from './src/components/modals/AuthModal/ForgotPasswordModal';
import OtpModal from './src/components/modals/AuthModal/OtpModal';

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { scheme } = useTheme();
  const dispatch = useDispatch();
  const { hasShownLaunchModal } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!hasShownLaunchModal) {
      const timer = setTimeout(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          dispatch(showAuthModal({ routeName: null, type: 'login' }));
        }
        dispatch(setHasShownLaunchModal());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [dispatch, hasShownLaunchModal]);

  return (
    <>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <OtpModal />
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ScrollProvider>
            <AppContent />
          </ScrollProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
