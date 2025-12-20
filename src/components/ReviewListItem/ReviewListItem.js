import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const ReviewListItem = React.memo(({ userName, rating, date, service, comment }) => {
  const { colors } = useTheme();

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= ratingValue ? 'star' : 'star-outline'}
          size={14}
          color={i <= ratingValue ? colors.warning : colors.textLight}
        />
      );
    }
    return stars;
  };

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
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: colors.text }]}>{userName}</Text>
            {service && (
              <Text style={[styles.service, { color: colors.textSecondary }]}>
                {service}
              </Text>
            )}
          </View>
        </View>
        <Text style={[styles.date, { color: colors.textLight }]}>{date}</Text>
      </View>

      <View style={styles.rating}>{renderStars(rating)}</View>

      {comment && (
        <Text style={[styles.comment, { color: colors.text }]}>{comment}</Text>
      )}
    </View>
  );
});

ReviewListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  service: PropTypes.string,
  comment: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius.md,
    padding: SPACING.md,
    borderWidth: 1,
    gap: SPACING.sm,
    ...SIZES.shadow.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  userDetails: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
  },
  service: {
    fontSize: 13,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: SPACING.xs,
  },
});

export default ReviewListItem;

