import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import styles from './AuthTextInput.styles';

const AuthTextInput = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoComplete,
  error,
  onBlur,
  onFocus,
  ...otherProps
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordField = secureTextEntry;
  const shouldShowPassword = isPasswordField && showPassword;

  return (
    <View style={styles.inputContainer}>
      {label ? (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.background,
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color={error ? colors.error : isFocused ? colors.primary : colors.textSecondary}
            style={styles.inputIcon}
          />
        ) : null}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordField && !shouldShowPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...otherProps}
        />
        {isPasswordField ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordToggle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={colors.error} style={styles.errorIcon} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

AuthTextInput.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

AuthTextInput.defaultProps = {
  label: '',
  icon: null,
  placeholder: '',
  value: '',
  secureTextEntry: false,
  keyboardType: 'default',
  autoCapitalize: 'none',
  autoComplete: 'off',
  error: null,
  onBlur: null,
  onFocus: null,
};

export default React.memo(AuthTextInput);


