import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { SIZES } from '../../constants/sizes';
import { NOTIFICATION_ICONS } from '../../constants/notifications';
import { useTheme } from '../../hooks/useTheme';

const NotificationItem = React.memo(({ notification, onPress }) => {
  const { colors } = useTheme();
  const typeConfig = NOTIFICATION_ICONS[notification.type] || {};

  const handlePress = useCallback(() => {
    onPress?.(notification);
  }, [notification, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.backgroundLight },
        !notification.isRead && {
          backgroundColor: colors.purple50,
          borderWidth: 1,
          borderColor: colors.borderPurple,
        },
        pressed && styles.rowPressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: typeConfig.iconBg || colors.indigo100 },
        ]}
      >
        <Ionicons
          name={typeConfig.icon || 'notifications-outline'}
          size={22}
          color={typeConfig.iconColor || colors.primary}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
              !notification.isRead && styles.titleUnread,
            ]}
            numberOfLines={1}
          >
            {notification.title}
          </Text>
          {!notification.isRead && (
            <View
              style={[styles.unreadDot, { backgroundColor: colors.primary }]}
            />
          )}
        </View>
        <Text
          style={[styles.message, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {notification.message}
        </Text>
        <Text style={[styles.time, { color: colors.textLight }]}>
          {notification.time}
        </Text>
      </View>
    </Pressable>
  );
});

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string,
    isRead: PropTypes.bool,
  }).isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radius.lg,
    ...SIZES.shadow.small,
  },
  rowPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginRight: SPACING.xs,
  },
  titleUnread: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  message: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
    marginBottom: SPACING.xs,
  },
  time: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
});

export default NotificationItem;


