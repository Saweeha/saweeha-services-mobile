import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');
const cardWidth = (width - SPACING.md * 3) / 2; // 2 columns with spacing

const TeamMemberCard = React.memo(({ name, role, image }) => {
  const { colors } = useTheme();

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

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    gap: SPACING.xs / 2,
    width: '100%',
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    textAlign: 'center',
  },
  role: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    textAlign: 'center',
  },
});

export default TeamMemberCard;

