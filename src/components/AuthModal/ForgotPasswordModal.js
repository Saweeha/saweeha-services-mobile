import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  openOtpModal,
  closeForgotPasswordModal,
  showAuthModal,
} from '../../store/authSlice';
import { useTheme } from '../../hooks/useTheme';
import styles from './AuthModal.styles';
import AuthTextInput from '../AuthTextInput/AuthTextInput';

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showForgotPasswordModal, otpEmail } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (otpEmail && !email) {
      setEmail(otpEmail);
    }
  }, [otpEmail, email]);

  const handleClose = () => {
    dispatch(closeForgotPasswordModal());
    setEmail('');
  };

  const handleSubmit = () => {
    if (!email) return;
    // In a real app, call API to send OTP here
    dispatch(openOtpModal({ context: 'reset', email }));
    dispatch(closeForgotPasswordModal());
  };

  const handleBackToLogin = () => {
    dispatch(closeForgotPasswordModal());
    dispatch(showAuthModal({ routeName: null, type: 'login' }));
  };

  return (
    <Modal
      visible={showForgotPasswordModal}
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
              <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Enter your email and we&apos;ll send you a 4-digit code to reset your password.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <AuthTextInput
                label="Email"
                icon="mail-outline"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: colors.primary,
                    opacity: email ? 1 : 0.6,
                  },
                ]}
                onPress={handleSubmit}
                disabled={!email}
              >
                <Text style={[styles.submitButtonText, { color: colors.textWhite }]}>
                  Send Code
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeTextButton} onPress={handleBackToLogin}>
                <Text style={[styles.closeText, { color: colors.textSecondary }]}>
                  Back to Sign In
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default ForgotPasswordModal;


