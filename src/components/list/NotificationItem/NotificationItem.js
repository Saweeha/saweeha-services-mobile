import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NOTIFICATION_ICONS } from '../../../constants/notifications';
import { useTheme } from '../../../hooks/useTheme';
import createNotificationItemStyles from './NotificationItem.styles';

const NotificationItem = React.memo(({ notification, onPress }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createNotificationItemStyles(colors), [colors]);
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

export default NotificationItem;



