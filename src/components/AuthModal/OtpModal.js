import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { closeOtpModal, login } from '../../store/authSlice';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';
import styles from './AuthModal.styles';

const OtpModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showOtpModal, otpContext, otpEmail } = useSelector((state) => state.auth);
  const inputRef = useRef(null);

  const [code, setCode] = useState('');

  useEffect(() => {
    if (showOtpModal) {
      // Focus the input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      // Clear code when modal closes
      setCode('');
    }
  }, [showOtpModal]);

  const handleClose = () => {
    dispatch(closeOtpModal());
    setCode('');
    inputRef.current?.blur();
  };

  const handleCodeChange = (text) => {
    const numeric = text.replace(/[^0-9]/g, '').slice(0, 4);
    setCode(numeric);
  };

  // Auto-confirm when code is complete
  useEffect(() => {
    if (code.length === 4) {
      // Small delay to show the last digit before confirming
      const timer = setTimeout(() => {
        if (otpContext === 'register') {
          // After successful OTP for registration, log the user in (dummy)
          dispatch(login());
        } else if (otpContext === 'reset') {
          // For reset, just show a success message (dummy)
          Alert.alert(
            'Password Reset',
            `A password reset link has been sent to ${otpEmail || 'your email'}.`,
            [{ text: 'OK', onPress: () => {} }],
          );
        }

        dispatch(closeOtpModal());
        setCode('');
        inputRef.current?.blur();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [code, otpContext, otpEmail, dispatch]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const title = otpContext === 'register' ? 'Verify Your Account' : 'Verify Your Email';
  const subtitle =
    otpContext === 'register'
      ? 'Enter the 4-digit code we sent to your email to complete your registration.'
      : 'Enter the 4-digit code we sent to your email to reset your password.';

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
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
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
              {/* OTP Input Boxes */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={focusInput}
                style={otpStyles.otpBoxesContainer}
              >
                {[0, 1, 2, 3].map((index) => {
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
                maxLength={4}
                autoFocus={false}
                style={otpStyles.hiddenInput}
                caretHidden
              />

              <TouchableOpacity style={styles.closeTextButton} onPress={handleClose}>
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
    width: 64,
    height: 64,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  otpText: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
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


