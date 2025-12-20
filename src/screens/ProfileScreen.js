import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';

const ProfileScreen = () => {
  const { scheme, colors, toggleScheme } = useTheme();
  const isDark = scheme === 'dark';

  // Mock user data - replace with actual user data from store/API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const handleItemPress = (item) => {
    if (item.type === 'switch') {
      return; // Switch handles its own state
    }
    if (item.onPress) {
      item.onPress();
    } else {
      console.log(item.label);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout');
  };

  const menuItems = [
    { id: 'edit', label: 'Edit Profile', icon: 'create-outline', type: 'action' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications-outline', type: 'action' },
    { id: 'payment', label: 'Payment Methods', icon: 'card-outline', type: 'action' },
    { id: 'addresses', label: 'Saved Addresses', icon: 'location-outline', type: 'action' },
    { id: 'help', label: 'Help & Support', icon: 'help-circle-outline', type: 'action' },
    { id: 'about', label: 'About', icon: 'information-circle-outline', type: 'action' },
    {
      id: 'dark-mode',
      label: 'Dark Mode',
      icon: isDark ? 'moon' : 'moon-outline',
      type: 'switch',
      value: isDark,
      onToggle: toggleScheme,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'log-out-outline',
      type: 'action',
      onPress: handleLogout,
      variant: 'danger',
    },
  ];

  const renderMenuItem = (item, index) => {
    const isLast = index === menuItems.length - 1;
    const showBorder = !isLast;

    if (item.type === 'switch') {
      return (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            showBorder && { borderBottomWidth: 1, borderBottomColor: colors.border },
          ]}
          activeOpacity={0.7}
          onPress={() => item.onToggle()}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons
              name={item.icon}
              size={22}
              color={colors.textSecondary}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuItemLabel, { color: colors.text }]}>{item.label}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            thumbColor={item.value ? colors.primary : colors.textLight}
            trackColor={{ false: colors.border, true: colors.primaryLight }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          showBorder && { borderBottomWidth: 1, borderBottomColor: colors.border },
        ]}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <Ionicons
            name={item.icon}
            size={22}
            color={item.variant === 'danger' ? colors.error : colors.textSecondary}
            style={styles.menuIcon}
          />
          <Text
            style={[
              styles.menuItemLabel,
              { color: item.variant === 'danger' ? colors.error : colors.text },
            ]}
          >
            {item.label}
          </Text>
        </View>
        {item.type !== 'switch' && (
          <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ScreenHeader title="Profile" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user.email}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.tabBarHeight + SPACING.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  menuSection: {
    paddingHorizontal: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 24,
  },
  menuItemLabel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: SPACING.md,
  },
});

export default ProfileScreen;

