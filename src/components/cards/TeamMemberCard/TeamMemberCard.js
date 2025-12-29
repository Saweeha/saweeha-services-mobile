import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createTeamMemberCardStyles from './TeamMemberCard.styles';

const TeamMemberCard = React.memo(({ name, role, image }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createTeamMemberCardStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {image ? (
          <Image source={image} style={styles.avatar} resizeMode="cover" />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.role, { color: colors.textSecondary }]} numberOfLines={1}>
          {role}
        </Text>
      </View>
    </View>
  );
});

TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

export default TeamMemberCard;


