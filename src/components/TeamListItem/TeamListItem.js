import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const TeamListItem = React.memo(({ name, role, experience, specialties = [] }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundLight,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="person" size={24} color={colors.primary} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.role, { color: colors.textSecondary }]}>{role}</Text>
        </View>
        <View style={styles.experience}>
          <Text style={[styles.experienceValue, { color: colors.primary }]}>
            {experience}
          </Text>
          <Text style={[styles.experienceLabel, { color: colors.textSecondary }]}>
            years
          </Text>
        </View>
      </View>

      {specialties && specialties.length > 0 && (
        <View style={styles.specialties}>
          {specialties.map((specialty, index) => (
            <View
              key={index}
              style={[
                styles.specialtyTag,
                {
                  backgroundColor: colors.backgroundSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.specialtyText, { color: colors.text }]}>
                {specialty}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
});

TeamListItem.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  specialties: PropTypes.arrayOf(PropTypes.string),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius.md,
    padding: SPACING.md,
    borderWidth: 1,
    gap: SPACING.md,
    ...SIZES.shadow.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    fontWeight: '500',
  },
  experience: {
    alignItems: 'center',
    gap: 2,
  },
  experienceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  experienceLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  specialtyTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius.sm,
    borderWidth: 1,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TeamListItem;

