import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { hideAuthModal, showAuthModal, openOtpModal, registerUser } from '../../../store/authSlice';
import { useTheme } from '../../../hooks/useTheme';
import styles from './AuthModal.styles';
import AuthTextInput from '../../auth/AuthTextInput/AuthTextInput';
import SocialAuthButtons from '../../auth/SocialAuthButtons/SocialAuthButtons';
import { validateRegisterForm, validateFullName, validateEmail, validatePhone, validatePassword, validatePasswordMatch } from '../../../utils/validators';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showAuthModal: visible, authModalType, loading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleClose = () => {
    dispatch(hideAuthModal());
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setTouched({});
  };

  const handleFullNameChange = (text) => {
    setFullName(text);
    if (touched.fullName && errors.fullName) {
      const nameValidation = validateFullName(text);
      if (nameValidation.isValid) {
        setErrors((prev) => ({ ...prev, fullName: null }));
      }
    }
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
      const passwordValidation = validatePassword(text);
      if (passwordValidation.isValid) {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
    // Also validate confirm password if it's been touched
    if (touched.confirmPassword && confirmPassword) {
      const matchValidation = validatePasswordMatch(text, confirmPassword);
      if (!matchValidation.isValid) {
        setErrors((prev) => ({ ...prev, confirmPassword: matchValidation.error }));
      } else if (errors.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (touched.confirmPassword && errors.confirmPassword && password) {
      const matchValidation = validatePasswordMatch(password, text);
      if (matchValidation.isValid) {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }
  };

  const handlePhoneChange = (text) => {
    // Ensure phone starts with +
    let formattedPhone = text;
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone.replace(/^\+*/, '');
    }
    setPhone(formattedPhone);
    if (touched.phone && errors.phone) {
      const phoneValidation = validatePhone(formattedPhone);
      if (phoneValidation.isValid) {
        setErrors((prev) => ({ ...prev, phone: null }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateRegisterForm({ fullName, email, phone, password, confirmPassword });
    if (validation.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleRegister = () => {
    const validation = validateRegisterForm({ fullName, email, phone, password, confirmPassword });
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched({ fullName: true, email: true, phone: true, password: true, confirmPassword: true });
      return;
    }

    // Clear errors and proceed with registration
    setErrors({});

    dispatch(registerUser({
      name: fullName,
      email,
      phone: phone.trim(),
      password
    }));
    // Note: otp modal is opened by the slice upon success
  };

  const handleSocialRegister = () => {
    // Social auth bypasses form validation
    // In a real app, this would trigger Google/Facebook auth flow
    // For social auth, we log the user in directly (no OTP needed since provider handles verification)
    // dispatch(login());
    alert('Social login not implemented yet');
    // handleClose();
  };

  const switchToLogin = () => {
    setErrors({});
    setTouched({});
    dispatch(showAuthModal({ routeName: null, type: 'login' }));
  };

  const canSubmit =
    fullName.trim() &&
    email.trim() &&
    phone.trim().length > 1 &&
    password.trim() &&
    confirmPassword.trim() &&
    !errors.fullName &&
    !errors.email &&
    !errors.phone &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <Modal
      visible={visible && authModalType === 'register'}
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
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign up to get started with Saweeha
              </Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <ScrollView
              style={styles.formContainer}
              contentContainerStyle={styles.formContentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* API Error Display */}
              {error && (
                <Text style={{ color: colors.error, marginBottom: 10, textAlign: 'center' }}>
                  {error}
                </Text>
              )}

              <AuthTextInput
                label="Full Name"
                icon="person-outline"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={handleFullNameChange}
                onBlur={() => handleBlur('fullName')}
                autoCapitalize="words"
                error={touched.fullName ? errors.fullName : null}
              />

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
                label="Phone Number"
                icon="call-outline"
                placeholder="+966 5XX XXX XXXX"
                value={phone}
                onChangeText={handlePhoneChange}
                onBlur={() => handleBlur('phone')}
                keyboardType="phone-pad"
                autoCapitalize="none"
                error={touched.phone ? errors.phone : null}
              />

              <AuthTextInput
                label="Password"
                icon="lock-closed-outline"
                placeholder="Create a password (min. 8 characters)"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                error={touched.password ? errors.password : null}
              />

              <AuthTextInput
                label="Confirm Password"
                icon="lock-closed-outline"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                onBlur={() => handleBlur('confirmPassword')}
                secureTextEntry
                autoCapitalize="none"
                error={touched.confirmPassword ? errors.confirmPassword : null}
              />

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: canSubmit && !loading ? 1 : 0.6,
                  },
                ]}
                onPress={handleRegister}
                disabled={!canSubmit || loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textWhite} />
                ) : (
                  <Text style={[styles.submitButtonText, { color: colors.textWhite }]}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              <SocialAuthButtons
                variant="register"
                onGooglePress={handleSocialRegister}
                onFacebookPress={handleSocialRegister}
              />

              <TouchableOpacity style={styles.closeTextButton} onPress={handleClose}>
                <Text style={[styles.closeText, { color: colors.textSecondary }]}>
                  Maybe Later
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryActionButton} onPress={switchToLogin}>
                <Text style={[styles.secondaryActionText, { color: colors.primary }]}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default RegisterModal;


