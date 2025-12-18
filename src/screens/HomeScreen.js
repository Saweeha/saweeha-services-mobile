import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Components
import PromotionSwiper from '../components/PromotionSwiper/PromotionSwiper';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import HomeHeader from '../components/HomeHeader/HomeHeader';

// Constants
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with API calls later
  const promotions = [
    {
      id: '1',
      image: null, // Placeholder - replace with actual image source
    },
    {
      id: '2',
      image: null, // Placeholder - replace with actual image source
    },
    {
      id: '3',
      image: null, // Placeholder - replace with actual image source
    },
  ];

  const categories = [
    { id: '1', name: 'Beauty Salons', icon: 'sparkles', color: COLORS.category1 },
    { id: '2', name: 'Barbers', icon: 'cut', color: COLORS.category2 },
    { id: '3', name: 'Massage', icon: 'hand-left', color: COLORS.category3 },
    { id: '4', name: 'Nail Salons', icon: 'color-palette', color: COLORS.category4 },
    { id: '5', name: 'Spa & Wellness', icon: 'leaf', color: COLORS.category5 },
    { id: '6', name: 'Fitness Centers', icon: 'barbell', color: COLORS.category6 },
  ];

  const businesses = [
    {
      id: '1',
      name: 'Elite Beauty Salon',
      category: 'Beauty & Spa',
      rating: 4.8,
      distance: '2.5 km',
    },
    {
      id: '2',
      name: 'FitZone Gym',
      category: 'Fitness',
      rating: 4.6,
      distance: '1.2 km',
    },
    {
      id: '3',
      name: 'Zen Wellness Center',
      category: 'Wellness',
      rating: 4.9,
      distance: '3.8 km',
    },
    {
      id: '4',
      name: 'Gourmet Kitchen',
      category: 'Food & Dining',
      rating: 4.7,
      distance: '0.8 km',
    },
  ];

  const renderBusiness = ({ item }) => (
    <BusinessCard
      name={item.name}
      category={item.category}
      rating={item.rating}
      distance={item.distance}
      onPress={() => console.log('Business pressed:', item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          title="Discover"
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          onPressNotifications={() => {
            navigation.navigate('Notifications');
          }}
        />

        {/* Promotions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Promotions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <PromotionSwiper
            promotions={promotions}
            onPress={(promotion) => console.log('Promotion pressed:', promotion.id)}
          />
        </View>

        {/* Near You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={businesses}
            renderItem={renderBusiness}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessesList}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                name={item.name}
                icon={item.icon}
                color={item.color}
                onPress={() => console.log('Category pressed:', item.id)}
              />
            ))}
          </View>
        </View>

        {/* Featured Businesses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Businesses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={businesses}
            renderItem={renderBusiness}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.businessesList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.tabBarHeight + SPACING.lg,
  },
  section: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.text,
  },
  seeAll: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  businessesList: {
    paddingRight: SPACING.md,
    paddingBottom: SPACING.sm,
  },
});

export default HomeScreen;

