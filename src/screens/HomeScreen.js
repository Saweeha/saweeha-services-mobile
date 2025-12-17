import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/colors';
import { CategoryCard, PromotionCard, BusinessCard } from '../components';
import CustomTabBar from '../components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator();

// Dummy data
const categories = [
  { id: 1, icon: 'cut-outline', title: 'Barbers', color: '#6366F1' },
  { id: 2, icon: 'sparkles-outline', title: 'Beauty', color: '#EC4899' },
  { id: 3, icon: 'fitness-outline', title: 'Spa', color: '#10B981' },
  { id: 4, icon: 'flower-outline', title: 'Salon', color: '#F59E0B' },
  { id: 5, icon: 'medical-outline', title: 'Wellness', color: '#8B5CF6' },
  { id: 6, icon: 'body-outline', title: 'Massage', color: '#EF4444' },
];

const promotions = [
  {
    id: 1,
    discount: '50% OFF',
    title: 'First Time Visit',
    subtitle: 'Book your first appointment',
    backgroundColor: COLORS.primary,
  },
  {
    id: 2,
    discount: '30% OFF',
    title: 'Weekend Special',
    subtitle: 'Valid on weekends only',
    backgroundColor: COLORS.secondary,
  },
  {
    id: 3,
    discount: '25% OFF',
    title: 'Refer a Friend',
    subtitle: 'Get discount when you refer',
    backgroundColor: '#10B981',
  },
];

const businesses = [
  {
    id: 1,
    name: 'Elite Barbershop',
    category: 'Barber',
    rating: 4.8,
    distance: '0.5 km',
    image: null,
  },
  {
    id: 2,
    name: 'Glamour Beauty Salon',
    category: 'Beauty Salon',
    rating: 4.9,
    distance: '1.2 km',
    image: null,
  },
  {
    id: 3,
    name: 'Serenity Spa',
    category: 'Spa & Wellness',
    rating: 4.7,
    distance: '2.1 km',
    image: null,
  },
  {
    id: 4,
    name: 'Modern Cuts',
    category: 'Hair Salon',
    rating: 4.6,
    distance: '0.8 km',
    image: null,
  },
];

const HomeContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Ahmed</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search services...</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                color={category.color}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Promotions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
          >
            {promotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                title={promo.title}
                subtitle={promo.subtitle}
                discount={promo.discount}
                backgroundColor={promo.backgroundColor}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Businesses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Businesses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessesContainer}
          >
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
                rating={business.rating}
                distance={business.distance}
                image={business.image}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Nearby Businesses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessesContainer}
          >
            {businesses.slice(0, 3).map((business) => (
              <BusinessCard
                key={business.id}
                name={business.name}
                category={business.category}
                rating={business.rating}
                distance={business.distance}
                image={business.image}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Placeholder screens for other tabs
const BookingsScreen = () => (
  <SafeAreaView style={styles.tabScreen}>
    <View style={styles.tabContent}>
      <Ionicons name="calendar-outline" size={64} color={COLORS.textLight} />
      <Text style={styles.tabTitle}>My Bookings</Text>
      <Text style={styles.tabSubtitle}>Your appointments will appear here</Text>
    </View>
  </SafeAreaView>
);

const FavoritesScreen = () => (
  <SafeAreaView style={styles.tabScreen}>
    <View style={styles.tabContent}>
      <Ionicons name="heart-outline" size={64} color={COLORS.textLight} />
      <Text style={styles.tabTitle}>Favorites</Text>
      <Text style={styles.tabSubtitle}>Save your favorite businesses</Text>
    </View>
  </SafeAreaView>
);

const ProfileScreen = () => (
  <SafeAreaView style={styles.tabScreen}>
    <View style={styles.tabContent}>
      <Ionicons name="person-outline" size={64} color={COLORS.textLight} />
      <Text style={styles.tabTitle}>Profile</Text>
      <Text style={styles.tabSubtitle}>Manage your account settings</Text>
    </View>
  </SafeAreaView>
);

// Tab Navigator
const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          display: 'none',
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeContent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.backgroundLight,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 24,
    marginBottom: 24,
    gap: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  categoriesContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  promotionsContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  businessesContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  bottomSpacer: {
    height: 20,
  },
  tabScreen: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  tabSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default HomeScreen;
