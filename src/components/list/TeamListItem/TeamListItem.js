import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createTeamListItemStyles from './TeamListItem.styles';

const TeamListItem = React.memo(({ name, role, experience, specialties = [] }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createTeamListItemStyles(colors), [colors]);

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

export default TeamListItem;


