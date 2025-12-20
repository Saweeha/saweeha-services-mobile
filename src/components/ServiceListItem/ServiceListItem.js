import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const ServiceListItem = React.memo(
  ({ title, duration, price, description, isSelected, onPress }) => {
    const { colors } = useTheme();

    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundLight,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
              {title}
            </Text>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: isSelected ? colors.primary : 'transparent',
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={16} color={colors.textWhite} />
              )}
            </View>
          </View>

          {description && (
            <Text
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {description}
            </Text>
          )}

          <View style={styles.footer}>
            <View style={styles.metaInfo}>
              <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {duration}
              </Text>
            </View>
            <Text style={[styles.price, { color: colors.primary }]}>{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

ServiceListItem.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius.md,
    ...SIZES.shadow.small,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ServiceListItem;

