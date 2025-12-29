import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createReviewListItemStyles from './ReviewListItem.styles';

const ReviewListItem = React.memo(({ userName, rating, date, service, comment }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createReviewListItemStyles(colors), [colors]);

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

export default ReviewListItem;


