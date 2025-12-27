import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async Thunks

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      console.log('Login response:', JSON.stringify(response, null, 2));
      // Store tokens only (not user data)
      if (response.success && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      console.log('Register response:', JSON.stringify(response, null, 2));
      // Store tokens from registration (needed for email verification)
      if (response.success && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ code }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(code);
      // Store tokens only (not user data)
      if (response.success && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Verification failed');
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  'auth/resendCode',
  async ({ email, type }, { rejectWithValue }) => {
    try {
      const response = await authService.resendCode(email, type);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to resend code');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      // Even if API call fails, we still want to clear local storage
      console.error('Logout API error:', error.message);
    }
    // Always clear storage regardless of API result
    await AsyncStorage.multiRemove(['token', 'refreshToken']);
    return true;
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return rejectWithValue('No token found');

      const response = await authService.getCurrentUser();
      console.log('CheckAuthStatus response:', JSON.stringify(response, null, 2));
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to get user');
      }
    } catch (error) {
      // ONLY clear tokens if it's an authentication error (401 or 403)
      // Don't clear on network errors or other server errors (500)
      if (error.response?.status === 401 || error.response?.status === 403) {
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(email, code, newPassword);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(id, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  showAuthModal: false,
  attemptedProtectedRoute: null, // Store which route was attempted
  hasShownLaunchModal: false, // Track if modal was shown on app launch
  authModalType: 'login', // 'login' | 'register'
  showForgotPasswordModal: false,
  showOtpModal: false,
  otpContext: null, // 'reset' | 'register'
  otpEmail: null,
  verificationSuccess: false, // For tracking OTP success
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    showAuthModal: (state, action) => {
      const { routeName = null, type = 'login' } = action.payload || {};
      state.showAuthModal = true;
      state.authModalType = type;
      state.attemptedProtectedRoute = routeName;
      state.error = null;
    },
    hideAuthModal: (state) => {
      state.showAuthModal = false;
      state.attemptedProtectedRoute = null;
      state.error = null;
    },
    openForgotPasswordModal: (state, action) => {
      state.showForgotPasswordModal = true;
      state.otpEmail = action.payload?.email || null;
      state.error = null;
    },
    closeForgotPasswordModal: (state) => {
      state.showForgotPasswordModal = false;
      state.error = null;
    },
    openOtpModal: (state, action) => {
      const { context = null, email = null } = action.payload || {};
      state.showOtpModal = true;
      state.otpContext = context;
      state.otpEmail = email || state.otpEmail || null;
      state.error = null;
      state.verificationSuccess = false;
    },
    closeOtpModal: (state) => {
      state.showOtpModal = false;
      state.otpContext = null;
      state.error = null;
    },
    setHasShownLaunchModal: (state) => {
      state.hasShownLaunchModal = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.showAuthModal = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Don't set authenticated yet, wait for verification
        // Show OTP modal
        state.showOtpModal = true;
        state.otpContext = 'register';
        state.otpEmail = action.meta.arg.email;
        state.showAuthModal = false; // Close register modal
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.showOtpModal = false;
        state.verificationSuccess = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });

    // Check Auth Status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // The API returns { success: true, message: "...", data: { user: { ... } } }
        // checkAuthStatus thunk returns response.data, which is { user: { ... } }
        // BUT let's be safe and check if it's already unwrapped or not
        state.user = action.payload?.user || action.payload;
        console.log('checkAuthStatus.fulfilled - assigned user:', !!state.user);
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // Don't set error message here as it might be a silent background check
      });

    // Resend Code
    builder
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Show OTP modal for reset
        state.showOtpModal = true;
        state.otpContext = 'reset';
        state.otpEmail = action.meta.arg; // email argument
        state.showForgotPasswordModal = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.showOtpModal = false;
        state.showAuthModal = true; // Show login modal
        state.authModalType = 'login';
        // Maybe show success message?
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update User Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
  setHasShownLaunchModal,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
