import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { NOTIFICATION_ICONS } from '../constants/notifications';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 30% off on all beauty services this weekend!',
      time: '2 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'booking',
      title: 'Booking Confirmed',
      message:
        'Your appointment at Elite Beauty Salon is confirmed for tomorrow at 2:00 PM',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Reminder',
      message: "Don't forget your booking at FitZone Gym tomorrow",
      time: '3 hours ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'update',
      title: 'New services available',
      message: 'Zen Wellness Center has added new massage therapy services',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'promotion',
      title: 'Flash Sale',
      message:
        'Limited time: 50% off on first-time bookings at selected salons',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: '6',
      type: 'booking',
      title: 'Booking cancelled',
      message: 'Your appointment at Gourmet Kitchen has been cancelled',
      time: '3 days ago',
      isRead: true,
    },
  ]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const formatTime = (timeStr) => timeStr;

  const NotificationItem = ({ notification }) => {
    const handlePress = () => {
      if (!notification.isRead) {
        markAsRead(notification.id);
      }
    };

    const typeConfig = NOTIFICATION_ICONS[notification.type] || {};

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.row,
          !notification.isRead && styles.rowUnread,
          pressed && styles.rowPressed,
        ]}
      >
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
            { backgroundColor: typeConfig.iconBg || COLORS.indigo100 },
              ]}
            >
              <Ionicons
            name={typeConfig.icon || 'notifications-outline'}
            size={22}
            color={typeConfig.iconColor || COLORS.primary}
              />
            </View>

            {/* Content */}
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
            <Text
              style={[
                styles.title,
                !notification.isRead && styles.titleUnread,
              ]}
              numberOfLines={1}
            >
                  {notification.title}
                </Text>
                {!notification.isRead && <View style={styles.unreadDot} />}
              </View>
          <Text style={styles.message} numberOfLines={2}>
                {notification.message}
              </Text>
          <Text style={styles.time}>{formatTime(notification.time)}</Text>
          </View>
        </Pressable>
    );
  };

  const renderItem = ({ item }) => (
    <NotificationItem notification={item} />
  );

  const keyExtractor = (item) => item.id;

  const ListEmptyComponent = () => (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="notifications-off-outline"
          size={56}
                color={COLORS.textLight}
              />
            </View>
      <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyMessage}>
        You're all caught up. We'll let you know when there&apos;s something new.
            </Text>
          </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.7}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  screenTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.text,
  },
  markAllText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radius.lg,
    backgroundColor: COLORS.backgroundLight,
    ...SIZES.shadow.small,
  },
  rowUnread: {
    backgroundColor: COLORS.purple50,
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
  },
  rowPressed: {
    opacity: 0.7,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.borderLight,
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
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  titleUnread: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  message: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
    marginBottom: SPACING.xs,
  },
  time: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.textLight,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
});

export default NotificationsScreen;


