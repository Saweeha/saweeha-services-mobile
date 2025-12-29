import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';

// Services
import businessService from '../services/businessService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

// Components
import CustomTabs from '../components/ui/CustomTabs/CustomTabs';
import AutoScrollView from '../components/list/AutoScrollView/AutoScrollView';

// New Components
import BusinessHero from '../components/business/BusinessHero/BusinessHero';
import BusinessInfo from '../components/business/BusinessInfo/BusinessInfo';
import ServiceListItem from '../components/list/ServiceListItem/ServiceListItem';
import TeamMemberCard from '../components/cards/TeamMemberCard/TeamMemberCard';
import ReviewListItem from '../components/list/ReviewListItem/ReviewListItem';
import InfoCard from '../components/cards/InfoCard/InfoCard';
import ServiceCategoryFilter from '../components/ui/ServiceCategoryFilter/ServiceCategoryFilter';
import ProfessionalSelectionModal from '../components/modals/ProfessionalSelectionModal/ProfessionalSelectionModal';
import ContinueButton from '../components/ui/ContinueButton/ContinueButton';
import FloatingContinueButton from '../components/ui/FloatingContinueButton/FloatingContinueButton';

// Constants & Hooks
import { SPACING } from '../constants/spacing';
import { useTheme } from '../hooks/useTheme';

const BusinessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors, scheme } = useTheme();
  const [activeTab, setActiveTab] = useState('services');
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeServiceCategory, setActiveServiceCategory] = useState('all');
  const [professionalModalVisible, setProfessionalModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // API state
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  // Get business ID from route params
  const businessId = route.params?.business?.id;

  // All available business images (fallback images)
  const allBusinessImages = [
    require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
    require('../../assets/businesses/pexels-delbeautybox-211032-853427.jpg'),
    require('../../assets/businesses/pexels-element5-973402.jpg'),
    require('../../assets/businesses/pexels-thgusstavo-1813272.jpg'),
    require('../../assets/businesses/pexels-cottonbro-3992874.jpg'),
  ];

  // Fetch business details from API
  const fetchBusinessDetails = useCallback(async () => {
    if (!businessId) {
      setLoading(false);
      setError('No business ID provided');
      return;
    }

    try {
      setError(null);
      const response = await businessService.getBusinessById(businessId);

      if (response?.success && response?.data) {
        setBusinessData(response.data);
        // Initialize selected branch ID if not set
        if (!selectedBranchId && response.data.branches?.length > 0) {
          setSelectedBranchId(response.data.branches[0].id);
        }
      } else {
        setError('Failed to load business details');
      }
    } catch (err) {
      console.error('Error fetching business details:', err);
      setError(err?.message || 'Failed to load business details');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [businessId]);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchBusinessDetails();
  }, [fetchBusinessDetails]);

  // Pull-to-refresh state and handler
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBusinessDetails();
  }, [fetchBusinessDetails]);

  // Get the selected branch data (with full details) from API response
  const selectedBranch = useMemo(() => {
    const branches = businessData?.branches;
    if (!branches || !Array.isArray(branches) || branches.length === 0) {
      return null;
    }
    if (!selectedBranchId) return branches[0];
    return branches.find(b => b.id === selectedBranchId) || branches[0];
  }, [businessData, selectedBranchId]);

  // Build business object with null safety
  const business = useMemo(() => {
    // Get business images from selected branch, with fallback to default images
    const branchImages = selectedBranch?.images || [];
    const imageUrls = branchImages
      .filter(img => img?.original_url)
      .map(img => ({
        uri: img.original_url,
        thumbnail: img.thumbnail_url || null
      }));

    // For API images, include both uri and thumbnail for progressive loading
    const images = imageUrls.length > 0
      ? imageUrls
      : allBusinessImages.map(img => ({ source: img, thumbnail: null }));

    const firstImage = imageUrls.length > 0
      ? { uri: imageUrls[0].uri, thumbnail: imageUrls[0].thumbnail }
      : { source: allBusinessImages[0], thumbnail: null };

    return {
      id: businessData?.id || businessId || null,
      name: businessData?.name || 'Unknown Business',
      about: businessData?.about || '',
      opening_hours: businessData?.opening_hours || null,
      rating: selectedBranch?.average_rating || 0,
      branches: (businessData?.branches || []).map(branch => ({
        id: branch?.id || null,
        name: branch?.name || 'Unknown Branch',
        address: branch?.address || '',
        location_url: branch?.location_url || null,
        average_rating: branch?.average_rating || null,
      })),
      images: images,
      image: firstImage,
      // branch specific data
      selectedBranchId: selectedBranch?.id || null,
      selectedBranch: selectedBranch,
      categories: selectedBranch?.categories || [],
      professionals: selectedBranch?.professionals || [],
      reviews: selectedBranch?.reviews || [],
    };
  }, [businessData, selectedBranch, businessId, allBusinessImages]);

  // Note: Header title is now managed entirely by navigation via route params
  // No screen-level header configuration allowed per design constraints

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About' },
  ];

  // Service categories - dynamically built from API data
  const serviceCategories = useMemo(() => {
    const categories = [{ id: 'all', label: 'All' }];

    (business.categories || []).forEach(category => {
      if (category?.id && category?.is_active) {
        categories.push({
          id: String(category.id),
          label: category.name || `Category ${category.id}`
        });
      }
    });

    return categories;
  }, [business.categories]);

  // Normalize API services for UI (with null safety)
  const normalizedServices = useMemo(() => {
    const allServices = [];

    (business.categories || []).forEach(category => {
      if (category?.services && Array.isArray(category.services)) {
        category.services.forEach(service => {
          allServices.push({
            id: service?.id || Math.random().toString(),
            title: service?.name || 'Unknown Service',
            duration: service?.duration_minutes ? `${service.duration_minutes} mins` : 'N/A',
            price: service?.price ? `${parseFloat(service.price).toFixed(0)} JD` : 'N/A',
            category: String(category.id),
            description: service?.description || '',
            isFeatured: false,
          });
        });
      }
    });

    return allServices;
  }, [business.categories]);

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    if (activeServiceCategory === 'all') {
      return normalizedServices;
    }
    return normalizedServices.filter(service => service.category === activeServiceCategory);
  }, [activeServiceCategory, normalizedServices]);

  // Normalize team members from API (with null safety)
  const teamMembers = useMemo(() => {
    return (business.professionals || []).map(professional => ({
      id: professional?.id || Math.random().toString(),
      name: professional?.name || 'Unknown Professional',
      role: professional?.role || 'Staff',
      image: professional?.profile_picture_url
        ? { uri: professional.profile_picture_url }
        : null,
      thumbnail: professional?.profile_picture_thumbnail_url
        ? { uri: professional.profile_picture_thumbnail_url }
        : null,
    }));
  }, [business.professionals]);

  // Normalize reviews from API (with null safety)
  const reviews = useMemo(() => {
    return (business.reviews || []).map(review => ({
      id: review?.id || Math.random().toString(),
      userName: review?.user_name || 'Anonymous',
      rating: review?.rating || 0,
      date: review?.created_at ? formatRelativeDate(review.created_at) : '',
      comment: review?.review || '',
      userImage: review?.profile_picture_url
        ? { uri: review.profile_picture_url }
        : null,
    }));
  }, [business.reviews]);

  // Helper function to format relative dates
  const formatRelativeDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
      return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    } catch {
      return '';
    }
  };

  // Helper function to format opening hours
  const formatOpeningHours = (hours) => {
    if (!hours) return 'Hours not available';

    const dayNames = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    };

    const lines = [];
    Object.entries(dayNames).forEach(([key, name]) => {
      const dayHours = hours[key];
      if (!dayHours || dayHours.is_closed) {
        lines.push(`${name}: Closed`);
      } else if (dayHours.ranges && dayHours.ranges.length > 0) {
        const timeRanges = dayHours.ranges
          .map(r => `${r.start || '?'} - ${r.end || '?'}`)
          .join(', ');
        lines.push(`${name}: ${timeRanges}`);
      } else {
        lines.push(`${name}: Closed`);
      }
    });

    return lines.join('\n');
  };

  // Get available professionals for a service
  // Note: Since API data doesn't have specialty matching, 
  // we return all professionals from the branch
  const getAvailableProfessionals = useCallback((service) => {
    if (!service) return [];
    // Return all team members since API doesn't provide specialty filtering
    return teamMembers;
  }, [teamMembers]);

  // Handle service press - open professional selection modal or unselect if already selected
  const handleServicePress = (service) => {
    const existingService = selectedServices.find(s => s.id === service.id);

    if (existingService) {
      // If service is already selected, unselect it
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      // If service is not selected, open modal to select professional
      setSelectedService(service);
      setProfessionalModalVisible(true);
    }
  };

  // Handle long press - allow changing professional for already selected service
  const handleServiceLongPress = (service) => {
    const existingService = selectedServices.find(s => s.id === service.id);

    if (existingService) {
      // Open modal to change professional
      setSelectedService(service);
      setProfessionalModalVisible(true);
    }
  };

  // Handle professional selection
  const handleProfessionalSelection = (professional) => {
    if (!selectedService) return;

    const serviceWithProfessional = {
      ...selectedService,
      selectedProfessional: professional,
    };

    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === selectedService.id);
      if (exists) {
        return prev.map(s =>
          s.id === selectedService.id ? serviceWithProfessional : s
        );
      }
      return [...prev, serviceWithProfessional];
    });
  };

  // Handle scroll to detect if at bottom
  const handleScroll = useCallback((event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 100; // Threshold for "at bottom"
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  }, []);

  // Handle branch selection
  const handleBranchSelect = (branch) => {
    setSelectedBranchId(branch.id);
    // Clear selected services when switching branches as services might differ
    setSelectedServices([]);
    // Reset service category filter
    setActiveServiceCategory('all');
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) return;

    // Check auth before navigating - handled by RootNavigator listener
    navigation.navigate('BookingDateTime', {
      selectedServices,
      business,
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <View style={styles.tabContent}>
            <ServiceCategoryFilter
              categories={serviceCategories}
              activeCategory={activeServiceCategory}
              onCategoryChange={setActiveServiceCategory}
            />
            {filteredServices.map((service) => {
              const selectedServiceData = selectedServices.find(s => s.id === service.id);
              return (
                <ServiceListItem
                  key={service.id}
                  title={service.title}
                  duration={service.duration}
                  price={service.price}
                  description={service.description}
                  isSelected={!!selectedServiceData}
                  selectedProfessional={selectedServiceData?.selectedProfessional}
                  onPress={() => handleServicePress(service)}
                  onLongPress={() => handleServiceLongPress(service)}
                />
              );
            })}
          </View>
        );

      case 'team':
        return (
          <View style={styles.tabContent}>
            {teamMembers.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No team members available
              </Text>
            ) : (
              <View style={styles.teamGrid}>
                {teamMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    image={member.image}
                  />
                ))}
              </View>
            )}
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.tabContent}>
            {reviews.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No reviews yet
              </Text>
            ) : (
              reviews.map((review) => (
                <ReviewListItem
                  key={review.id}
                  userName={review.userName}
                  rating={review.rating}
                  date={review.date}
                  comment={review.comment}
                />
              ))
            )}
          </View>
        );

      case 'about':
        return (
          <View style={styles.tabContent}>
            <InfoCard
              icon="information-circle-outline"
              title="About"
              content={business.about || 'No description available.'}
            />
            {business.opening_hours && (
              <InfoCard
                icon="time-outline"
                title="Operating Hours"
                content={formatOpeningHours(business.opening_hours)}
              />
            )}
            <InfoCard
              icon="location-outline"
              title="Location"
              content={business.selectedBranch?.address || 'No address available'}
            />
          </View>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background }]}
        edges={['top']}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, styles.errorContainer, { backgroundColor: colors.background }]}
        edges={['top']}
      >
        <Text style={[styles.errorText, { color: colors.error || '#ff4444' }]}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <AutoScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
            colors={[colors.primary]}
            progressBackgroundColor={scheme === 'dark' ? '#334155' : '#FFFFFF'}
          />
        }
      >
        <BusinessHero key={selectedBranchId} images={business.images} />

        <BusinessInfo
          name={business.name}
          category={business.category}
          rating={business.rating}
          branches={business.branches}
          selectedBranchId={selectedBranchId}
          onBranchSelect={handleBranchSelect}
        />

        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {renderContent()}

        {/* Relative Continue Button at bottom of content */}
        {selectedServices.length > 0 && (
          <View style={styles.bottomButtonContainer}>
            <ContinueButton
              label="Continue"
              onPress={handleContinue}
              count={selectedServices.length}
            />
          </View>
        )}
      </AutoScrollView>

      <ProfessionalSelectionModal
        visible={professionalModalVisible}
        service={selectedService}
        professionals={selectedService ? getAvailableProfessionals(selectedService) : []}
        currentProfessional={
          selectedService
            ? selectedServices.find(s => s.id === selectedService.id)?.selectedProfessional
            : null
        }
        onClose={() => {
          setProfessionalModalVisible(false);
          setSelectedService(null);
        }}
        onSelectProfessional={handleProfessionalSelection}
      />

      {/* Floating Continue Button */}
      <FloatingContinueButton
        visible={selectedServices.length > 0 && !isAtBottom}
        onPress={handleContinue}
        count={selectedServices.length}
        label="Continue"
        icon="arrow-forward"
      />
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
    paddingBottom: SPACING.xxl,
  },
  bottomButtonContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  tabContent: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ratingSummary: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  ratingText: {
    gap: SPACING.xs / 2,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  ratingCount: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: SPACING.lg,
    fontSize: 14,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BusinessScreen;

