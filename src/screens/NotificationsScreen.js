import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Constants
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';
import NotificationItem from '../components/list/NotificationItem/NotificationItem';
import { useAuthGuard } from '../hooks/useAuthGuard';

const NotificationsScreen = () => {
  const { colors } = useTheme();
  useAuthGuard('Notifications');

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
      message: "Don't forget your booking at ABC Salon tomorrow",
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

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const renderItem = ({ item }) => (
    <NotificationItem
      notification={item}
      onPress={() => {
        if (!item.isRead) {
          markAsRead(item.id);
        }
      }}
    />
  );

  const keyExtractor = (item) => item.id;

  const ListEmptyComponent = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons
          name="notifications-off-outline"
          size={56}
          color={colors.textLight}
        />
      </View>
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptyMessage}>
        You're all caught up. We'll let you know when there&apos;s something new.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['bottom']}
    >
      <FlatList
        data={notifications}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      {unreadCount > 0 && (
        <TouchableOpacity
          style={[
            styles.fab,
            {
              backgroundColor: colors.primary,
            },
          ]}
          activeOpacity={0.85}
          onPress={markAllAsRead}
        >
          <Ionicons name="checkmark-done" size={18} color={colors.textWhite} />
          <Text style={[styles.fabText, { color: colors.textWhite }]}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SIZES.shadow.medium,
  },
  fabText: {
    marginLeft: SPACING.xs,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
});

export default NotificationsScreen;


