import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { hideAuthModal, loginUser, showAuthModal, openForgotPasswordModal } from '../../../store/authSlice';
import { useTheme } from '../../../hooks/useTheme';
import styles from './AuthModal.styles';
import AuthTextInput from '../../auth/AuthTextInput/AuthTextInput';
import SocialAuthButtons from '../../auth/SocialAuthButtons/SocialAuthButtons';
import { validateLoginForm, validateEmail } from '../../../utils/validators';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showAuthModal: visible, authModalType, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleClose = () => {
    dispatch(hideAuthModal());
    setEmail('');
    setPassword('');
    setErrors({});
    setTouched({});
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (touched.email && errors.email) {
      const emailValidation = validateEmail(text);
      if (emailValidation.isValid) {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (touched.password && errors.password) {
      if (text.trim() !== '') {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateLoginForm({ email, password });
    if (validation.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleLogin = () => {
    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({ email: true, password: true });
      return;
    }

    setErrors({});
    dispatch(loginUser({ email, password }));
  };

  const handleSocialLogin = () => {
    alert('Social login not implemented yet');
  };

  const switchToRegister = () => {
    setErrors({});
    setTouched({});
    dispatch(showAuthModal({ routeName: null, type: 'register' }));
  };

  const handleForgotPassword = () => {
    dispatch(hideAuthModal());
    dispatch(openForgotPasswordModal({ email }));
  };

  const canSubmit = email.trim() && password.trim() && !errors.email && !errors.password;

  return (
    <Modal
      visible={visible && authModalType === 'login'}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.backgroundLight }]}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign in to continue to your account
              </Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.formContainer}
              contentContainerStyle={styles.formContentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {error && (
                <Text style={{ color: colors.error, marginBottom: 10, textAlign: 'center' }}>
                  {error}
                </Text>
              )}

              <AuthTextInput
                label="Email"
                icon="mail-outline"
                placeholder="Enter your email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={touched.email ? errors.email : null}
              />

              <AuthTextInput
                label="Password"
                icon="lock-closed-outline"
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                error={touched.password ? errors.password : null}
              />

              <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: canSubmit ? 1 : 0.6,
                  },
                ]}
                onPress={handleLogin}
                disabled={!canSubmit}
              >
                <Text style={[styles.submitButtonText, { color: colors.textWhite }]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <SocialAuthButtons
                variant="login"
                onGooglePress={handleSocialLogin}
                onFacebookPress={handleSocialLogin}
              />

              <TouchableOpacity style={styles.closeTextButton} onPress={handleClose}>
                <Text style={[styles.closeText, { color: colors.textSecondary }]}>
                  Maybe Later
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryActionButton} onPress={switchToRegister}>
                <Text style={[styles.secondaryActionText, { color: colors.primary }]}>
                  Don&apos;t have an account? Register
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default LoginModal;


