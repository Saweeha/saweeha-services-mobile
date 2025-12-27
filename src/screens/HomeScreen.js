import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Components
import PromotionSwiper from '../components/media/PromotionSwiper/PromotionSwiper';
import CategoryCard from '../components/cards/CategoryCard/CategoryCard';
import BusinessCard from '../components/cards/BusinessCard/BusinessCard';
import HomeHeader from '../components/layout/HomeHeader/HomeHeader';
import { businessService } from '../services/businessService';

// Constants
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [nearYouBusinesses, setNearYouBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  React.useEffect(() => {
    fetchNearYouBusinesses();
  }, []);

  const fetchNearYouBusinesses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await businessService.getAllBusinesses();
      if (response && response.success && Array.isArray(response.data)) {
        setNearYouBusinesses(response.data);
      } else {
        setNearYouBusinesses([]);
      }
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError('Failed to load businesses');
      setNearYouBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data - replace with API calls later
  const promotions = [
    {
      id: '1',
      image: require('../../assets/promo/promo-1.jpg'),
    },
    {
      id: '2',
      image: require('../../assets/promo/promo-2.jpg'),
    },
    {
      id: '3',
      image: require('../../assets/promo/promo-3.jpg'),
    },
    {
      id: '4',
      image: require('../../assets/promo/promo-4.jpg'),
    },
  ];

  const categories = [
    { id: '1', name: 'Beauty Salons', icon: 'sparkles', color: colors.category1 },
    { id: '2', name: 'Barbers', icon: 'cut', color: colors.category2 },
    { id: '3', name: 'Massage', icon: 'hand-left', color: colors.category3 },
    { id: '4', name: 'Nail Salons', icon: 'color-palette', color: colors.category4 },
    { id: '5', name: 'Spa & Wellness', icon: 'leaf', color: colors.category5 },
    { id: '6', name: 'Fitness Centers', icon: 'barbell', color: colors.category6 },
  ];

  const businesses = [
    {
      id: '1',
      name: 'Elite Beauty Salon',
      category: 'Beauty & Spa',
      rating: 4.8,
      distance: '2.5 km',
      image: require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
    },
    {
      id: '2',
      name: 'FitZone Gym',
      category: 'Fitness',
      rating: 4.6,
      distance: '1.2 km',
      image: require('../../assets/businesses/pexels-thgusstavo-1813272.jpg'),
    },
    {
      id: '3',
      name: 'Zen Wellness Center',
      category: 'Wellness',
      rating: 4.9,
      distance: '3.8 km',
      image: require('../../assets/businesses/pexels-element5-973402.jpg'),
    },
    {
      id: '4',
      name: 'Gourmet Kitchen',
      category: 'Food & Dining',
      rating: 4.7,
      distance: '0.8 km',
      image: require('../../assets/businesses/pexels-cottonbro-3992874.jpg'),
    },
  ];

  const renderBusiness = ({ item }) => {
    // Basic null safety for the mapping
    const firstBranch = item?.branches?.[0];
    const imageUrl = firstBranch?.first_image_url;

    return (
      <BusinessCard
        name={item?.name || 'Unknown Business'}
        category={item?.category || 'General'} // Use category if available, otherwise fallback
        rating={item?.average_rating || 0}
        distance={firstBranch?.address ? firstBranch.address.split(',')[0] : 'Distance N/A'}
        image={imageUrl ? { uri: imageUrl } : null}
        onPress={() => navigation.navigate('Business', { business: item })}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
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
          <PromotionSwiper
            promotions={promotions}
            onPress={(promotion) => console.log('Promotion pressed:', promotion.id)}
          />
        </View>

        {/* Near You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessList')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>
                {isLoading ? 'Loading...' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              <TouchableOpacity onPress={fetchNearYouBusinesses}>
                <Text style={[styles.retryText, { color: colors.primary }]}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={nearYouBusinesses.slice(0, 4)}
              renderItem={renderBusiness}
              keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.businessesList}
              ListEmptyComponent={
                !isLoading && (
                  <Text style={[styles.emptyText, { color: colors.textLight }]}>
                    No businesses found nearby
                  </Text>
                )
              }
            />
          )}
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Businesses</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SIZES.tabBarHeight + SPACING.lg,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  seeAll: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  businessesList: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  errorContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.xs,
  },
  retryText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    paddingHorizontal: SPACING.md,
  },
});

export default HomeScreen;

