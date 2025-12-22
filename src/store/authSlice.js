import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  showAuthModal: false,
  attemptedProtectedRoute: null, // Store which route was attempted
  hasShownLaunchModal: false, // Track if modal was shown on app launch
  authModalType: 'login', // 'login' | 'register'
  showForgotPasswordModal: false,
  showOtpModal: false,
  otpContext: null, // 'reset' | 'register'
  otpEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      if (action.payload) {
        // Dummy user data
        state.user = {
          id: '1',
          name: 'User',
          email: 'user@example.com',
        };
      } else {
        state.user = null;
      }
    },
    showAuthModal: (state, action) => {
      const { routeName = null, type = 'login' } = action.payload || {};
      state.showAuthModal = true;
      state.authModalType = type;
      state.attemptedProtectedRoute = routeName;
    },
    hideAuthModal: (state) => {
      state.showAuthModal = false;
      state.attemptedProtectedRoute = null;
    },
    openForgotPasswordModal: (state, action) => {
      state.showForgotPasswordModal = true;
      state.otpEmail = action.payload?.email || null;
    },
    closeForgotPasswordModal: (state) => {
      state.showForgotPasswordModal = false;
    },
    openOtpModal: (state, action) => {
      const { context = null, email = null } = action.payload || {};
      state.showOtpModal = true;
      state.otpContext = context;
      state.otpEmail = email || state.otpEmail || null;
    },
    closeOtpModal: (state) => {
      state.showOtpModal = false;
      state.otpContext = null;
    },
    setHasShownLaunchModal: (state) => {
      state.hasShownLaunchModal = true;
    },
    // Dummy login action - just sets authenticated to true
    login: (state) => {
      state.isAuthenticated = true;
      state.user = {
        id: '1',
        name: 'User',
        email: 'user@example.com',
      };
      state.showAuthModal = false;
      state.attemptedProtectedRoute = null;
      state.authModalType = 'login';
      state.showOtpModal = false;
      state.otpContext = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  setAuthenticated,
  showAuthModal,
  hideAuthModal,
  openForgotPasswordModal,
  closeForgotPasswordModal,
  openOtpModal,
  closeOtpModal,
  login,
  logout,
  setHasShownLaunchModal,
} = authSlice.actions;

export default authSlice.reducer;

