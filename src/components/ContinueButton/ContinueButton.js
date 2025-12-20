import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const ContinueButton = React.memo(({ 
  label = 'Continue', 
  onPress, 
  disabled = false,
  count,
  style,
}) => {
  const { colors } = useTheme();

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
        <Ionicons name="arrow-forward" size={20} color={colors.textWhite} />
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
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SIZES.shadow.medium,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ContinueButton;

