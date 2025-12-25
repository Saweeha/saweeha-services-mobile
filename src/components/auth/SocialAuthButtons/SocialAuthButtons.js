import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import styles from './SocialAuthButtons.styles';

const SocialAuthButtons = ({
  variant, // 'login' | 'register'
  onGooglePress,
  onFacebookPress,
}) => {
  const { colors } = useTheme();

  const centerText =
    variant === 'register' ? 'Or sign up with' : 'Or continue with';

  const googleText =
    variant === 'register' ? 'Sign up with Google' : 'Continue with Google';

  const facebookText =
    variant === 'register' ? 'Sign up with Facebook' : 'Continue with Facebook';

  return (
    <View style={styles.socialSection}>
      <View style={styles.socialDividerRow}>
        <View style={[styles.socialDivider, { backgroundColor: colors.border }]} />
        <Text style={[styles.socialDividerText, { color: colors.textSecondary }]}>
          {centerText}
        </Text>
        <View style={[styles.socialDivider, { backgroundColor: colors.border }]} />
      </View>

      <View style={styles.socialButtonsRow}>
        <TouchableOpacity
          style={[
            styles.socialButton,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
          activeOpacity={0.9}
          onPress={onGooglePress}
        >
          <Ionicons
            name="logo-google"
            size={18}
            color={colors.text}
            style={styles.socialButtonIcon}
          />
          <Text style={[styles.socialButtonText, { color: colors.text }]}>
            {googleText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.socialButton,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
          activeOpacity={0.9}
          onPress={onFacebookPress}
        >
          <Ionicons
            name="logo-facebook"
            size={18}
            color={colors.primary}
            style={styles.socialButtonIcon}
          />
          <Text style={[styles.socialButtonText, { color: colors.text }]}>
            {facebookText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SocialAuthButtons.propTypes = {
  variant: PropTypes.oneOf(['login', 'register']),
  onGooglePress: PropTypes.func.isRequired,
  onFacebookPress: PropTypes.func.isRequired,
};

SocialAuthButtons.defaultProps = {
  variant: 'login',
};

export default React.memo(SocialAuthButtons);


