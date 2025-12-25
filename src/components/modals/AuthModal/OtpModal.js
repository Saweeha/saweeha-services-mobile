import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { closeOtpModal, verifyEmail, resendVerificationCode, resetPassword, showAuthModal } from '../../../store/authSlice';
import { useTheme } from '../../../hooks/useTheme';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';
import { TYPOGRAPHY } from '../../../constants/typography';
import styles from './AuthModal.styles';
import { ActivityIndicator } from 'react-native';
import AuthTextInput from '../../auth/AuthTextInput/AuthTextInput';

const OtpModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showOtpModal, otpContext, otpEmail, loading, error } = useSelector((state) => state.auth);
  const inputRef = useRef(null);

  const [code, setCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  // For password reset flow
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (showOtpModal) {
      // Focus the input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      // Reset state when modal opens
      setShowNewPasswordForm(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      // Clear code when modal closes
      setCode('');
    }
  }, [showOtpModal]);

  const handleClose = () => {
    dispatch(closeOtpModal());
    setCode('');
    setShowNewPasswordForm(false);
    setNewPassword('');
    setConfirmPassword('');
    inputRef.current?.blur();
  };

  const handleCodeChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(numeric);
  };

  const handleResendCode = () => {
    if (resendDisabled || !otpEmail) return;

    const type = otpContext === 'register' ? 'registration' : 'password_reset';
    dispatch(resendVerificationCode({ email: otpEmail, type }));

    // Start cooldown timer
    setResendDisabled(true);
    setResendTimer(60);
  };

  const handleVerifyCode = () => {
    if (code.length !== 6) return;

    if (otpContext === 'register') {
      // For registration, verify email and auto-login (Bearer token identifies user)
      dispatch(verifyEmail({ code }));
    } else if (otpContext === 'reset') {
      // For password reset, show the new password form
      setShowNewPasswordForm(true);
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || newPassword !== confirmPassword || !otpEmail) return;

    dispatch(resetPassword({ email: otpEmail, code, newPassword }));
  };

  // Auto-confirm when code is complete
  useEffect(() => {
    if (code.length === 6 && !showNewPasswordForm) {
      // Small delay to show the last digit before confirming
      const timer = setTimeout(() => {
        handleVerifyCode();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, showNewPasswordForm]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const title = otpContext === 'register' ? 'Verify Your Account' : 'Verify Your Email';
  const subtitle =
    otpContext === 'register'
      ? 'Enter the 6-digit code we sent to your email to complete your registration.'
      : showNewPasswordForm
        ? 'Enter your new password below.'
        : 'Enter the 6-digit code we sent to your email to reset your password.';

  return (
    <Modal
      visible={showOtpModal}
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
              <Text style={[styles.title, { color: colors.text }]}>
                {showNewPasswordForm ? 'Reset Password' : title}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {subtitle}
              </Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={otpStyles.container}>
              {/* Error Message */}
              {error && (
                <Text style={{ color: colors.error, marginBottom: 10, textAlign: 'center' }}>
                  {error}
                </Text>
              )}

              {loading && <ActivityIndicator size="small" color={colors.primary} style={{ marginBottom: 10 }} />}

              {!showNewPasswordForm ? (
                <>
                  {/* OTP Input Boxes */}
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={focusInput}
                    style={otpStyles.otpBoxesContainer}
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const isFilled = code[index];
                      const isActive = code.length === index;
                      return (
                        <View
                          key={index}
                          style={[
                            otpStyles.otpBox,
                            {
                              backgroundColor: colors.background,
                              borderColor: isActive
                                ? colors.primary
                                : isFilled
                                  ? colors.primary
                                  : colors.border,
                              borderWidth: isActive ? 2 : 1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              otpStyles.otpText,
                              { color: colors.text, fontFamily: TYPOGRAPHY.fontFamily.semibold },
                            ]}
                          >
                            {code[index] || ''}
                          </Text>
                          {isActive && !isFilled && (
                            <View
                              style={[
                                otpStyles.cursor,
                                { backgroundColor: colors.primary },
                              ]}
                            />
                          )}
                        </View>
                      );
                    })}
                  </TouchableOpacity>

                  {/* Hidden TextInput to capture input */}
                  <TextInput
                    ref={inputRef}
                    value={code}
                    onChangeText={handleCodeChange}
                    keyboardType="number-pad"
                    maxLength={6}
                    autoFocus={false}
                    style={otpStyles.hiddenInput}
                    caretHidden
                  />

                  <TouchableOpacity style={styles.closeTextButton} onPress={handleResendCode} disabled={resendDisabled}>
                    <Text style={[styles.closeText, { color: resendDisabled ? colors.textSecondary : colors.primary }]}>
                      {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {/* New Password Form for Reset */}
                  <AuthTextInput
                    label="New Password"
                    icon="lock-closed-outline"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <AuthTextInput
                    label="Confirm Password"
                    icon="lock-closed-outline"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor: colors.primary,
                        opacity: newPassword && newPassword === confirmPassword ? 1 : 0.6,
                        marginTop: SPACING.md,
                      },
                    ]}
                    onPress={handleResetPassword}
                    disabled={!newPassword || newPassword !== confirmPassword || loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.textWhite} />
                    ) : (
                      <Text style={[styles.submitButtonText, { color: colors.textWhite }]}>
                        Reset Password
                      </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity style={[styles.closeTextButton, { marginTop: SPACING.md }]} onPress={handleClose}>
                <Text style={[styles.closeText, { color: colors.textSecondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const otpStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: SPACING.sm,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  otpText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
  },
  cursor: {
    width: 2,
    height: 24,
    position: 'absolute',
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    zIndex: -1,
  },
});

export default OtpModal;
