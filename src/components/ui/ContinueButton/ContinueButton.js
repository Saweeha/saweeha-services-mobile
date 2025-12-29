import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createContinueButtonStyles from './ContinueButton.styles';

const ContinueButton = React.memo(({
  label = 'Continue',
  onPress,
  disabled = false,
  count,
  style,
  icon,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createContinueButtonStyles(colors), [colors]);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.border : colors.primary,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {count !== undefined && count > 0 && (
          <View style={[styles.badge, { backgroundColor: colors.backgroundLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {count}
            </Text>
          </View>
        )}
        <Text style={[styles.label, { color: colors.textWhite }]}>
          {label}
        </Text>
        {icon && <Ionicons name={icon} size={20} color={colors.textWhite} />}
      </View>
    </TouchableOpacity>
  );
});

ContinueButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  count: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
};

export default ContinueButton;


