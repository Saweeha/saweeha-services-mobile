import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);

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
      console.error('Logout API error:', error.message);
    }
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

      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to get user');
      }
    } catch (error) {
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
  attemptedProtectedRoute: null,
  hasShownLaunchModal: false,
  authModalType: 'login',
  showForgotPasswordModal: false,
  showOtpModal: false,
  otpContext: null,
  otpEmail: null,
  verificationSuccess: false,
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

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.showOtpModal = true;
        state.otpContext = 'register';
        state.otpEmail = action.meta.arg.email;
        state.showAuthModal = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

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

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.showOtpModal = true;
        state.otpContext = 'reset';
        state.otpEmail = action.meta.arg;
        state.showForgotPasswordModal = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.showOtpModal = false;
        state.showAuthModal = true;
        state.authModalType = 'login';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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
