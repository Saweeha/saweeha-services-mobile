import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  
  const mainTabs = state.routes.filter(route => route.name !== 'Profile');
  const profileTab = state.routes.find(route => route.name === 'Profile');

  const getIconName = (routeName, isActive) => {
    const iconMap = {
      HomeTab: isActive ? 'home' : 'home-outline',
      Bookings: isActive ? 'calendar' : 'calendar-outline',
      Favorites: isActive ? 'heart' : 'heart-outline',
      Profile: isActive ? 'person' : 'person-outline',
    };
    return iconMap[routeName] || 'ellipse-outline';
  };

  const renderTab = (route) => {
    const { options } = descriptors[route.key];
    const routeIndex = state.routes.findIndex(r => r.key === route.key);
    const isFocused = state.index === routeIndex;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.tabItem, isTablet && styles.tabItemTablet]}
        activeOpacity={0.7}
      >
        <View style={[styles.tabContent, isFocused && styles.tabContentActive]}>
          <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
            <Ionicons
              name={getIconName(route.name, isFocused)}
              size={28}
              color={isFocused ? COLORS.primary : COLORS.textLight}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }, isTablet && styles.containerTablet]}>
      <BlurView intensity={90} tint="light" style={[styles.tabBar, isTablet && styles.tabBarTablet]}>
        {mainTabs.map(renderTab)}
      </BlurView>

      {profileTab && (
        <BlurView intensity={90} tint="light" style={[styles.profileTabBar, isTablet && styles.profileTabBarTablet]}>
          <View style={styles.profileTabItem}>
            {renderTab(profileTab)}
          </View>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  containerTablet: {
    justifyContent: 'flex-start',
    gap: 24,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 100,
    height: 64,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 25,
    borderWidth: 0,
    overflow: 'hidden',
    gap: 6,
    alignSelf: 'flex-start',
  },
  tabBarTablet: {
    height: 64,
    gap: 6,
  },
  profileTabBar: {
    flexDirection: 'row',
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 25,
    borderWidth: 0,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTabBarTablet: {
    alignSelf: 'flex-start',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 64,
  },
  tabItemTablet: {
    height: 64,
    paddingHorizontal: 16,
  },
  profileTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  tabContentActive: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 0,
  },
  iconContainerActive: {
    backgroundColor: COLORS.backgroundLight,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default CustomTabBar;
