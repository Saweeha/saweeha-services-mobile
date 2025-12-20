import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');
const CONTAINER_PADDING = SPACING.md;
const CARD_SPACING = SPACING.md;
const CARD_WIDTH = width - CONTAINER_PADDING * 2;

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Mock data - replace with API calls later
  const [favorites] = useState([
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
    {
      id: '5',
      name: 'Luxury Spa & Massage',
      category: 'Spa & Wellness',
      rating: 4.9,
      distance: '2.1 km',
      image: require('../../assets/businesses/pexels-delbeautybox-211032-853427.jpg'),
    },
    {
      id: '6',
      name: 'Premium Hair Studio',
      category: 'Beauty & Spa',
      rating: 4.8,
      distance: '1.5 km',
      image: require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
    },
  ]);

  const renderBusinessCard = ({ item, index }) => {
    const isLastItem = index === favorites.length - 1;

    return (
      <View
        style={[
          styles.cardWrapper,
          { marginBottom: isLastItem ? 0 : CARD_SPACING },
        ]}
      >
        <BusinessCard
          name={item.name}
          category={item.category}
          rating={item.rating}
          distance={item.distance}
          image={item.image}
          cardWidth={CARD_WIDTH}
          onPress={() => navigation.navigate('Business', { business: item })}
        />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconContainer, { backgroundColor: colors.border }]}>
        <Ionicons name="heart-outline" size={64} color={colors.textLight} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Favorites Yet</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textLight }]}>
        Start adding businesses to your favorites to see them here
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Header */}
      <ScreenHeader
        title="Favorites"
        count={favorites.length > 0 ? favorites.length : undefined}
        countLabel="favorite"
      />

      {/* List */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingBottom: SIZES.tabBarHeight + SPACING.lg,
  },
  cardWrapper: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SIZES.tabBarHeight + SPACING.lg,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSize.md * TYPOGRAPHY.lineHeight.relaxed,
  },
});

export default FavoritesScreen;

