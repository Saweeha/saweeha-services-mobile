import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

// Components
import CustomTabs from '../components/CustomTabs/CustomTabs';
import AutoScrollView from '../components/AutoScrollView/AutoScrollView';

// New Components
import BusinessHero from '../components/BusinessHero/BusinessHero';
import BusinessInfo from '../components/BusinessInfo/BusinessInfo';
import ServiceListItem from '../components/ServiceListItem/ServiceListItem';
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import ReviewListItem from '../components/ReviewListItem/ReviewListItem';
import InfoCard from '../components/InfoCard/InfoCard';
import ServiceCategoryFilter from '../components/ServiceCategoryFilter/ServiceCategoryFilter';
import ProfessionalSelectionModal from '../components/ProfessionalSelectionModal/ProfessionalSelectionModal';
import ContinueButton from '../components/ContinueButton/ContinueButton';
import FloatingContinueButton from '../components/FloatingContinueButton/FloatingContinueButton';

// Constants & Hooks
import { SPACING } from '../constants/spacing';
import { useTheme } from '../hooks/useTheme';

const BusinessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('services');
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeServiceCategory, setActiveServiceCategory] = useState('all');
  const [professionalModalVisible, setProfessionalModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Get business data from route params or use mock data
  const routeBusiness = route.params?.business;

  // All available business images
  const allBusinessImages = [
    require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
    require('../../assets/businesses/pexels-delbeautybox-211032-853427.jpg'),
    require('../../assets/businesses/pexels-element5-973402.jpg'),
    require('../../assets/businesses/pexels-thgusstavo-1813272.jpg'),
    require('../../assets/businesses/pexels-cottonbro-3992874.jpg'),
  ];

  // Mock branches data
  const mockBranches = [
    {
      id: '1',
      name: 'Downtown Branch',
      address: '123 Main Street, Downtown',
      phone: '+962 6 123 4567',
    },
    {
      id: '2',
      name: 'Mall Branch',
      address: '456 Shopping Mall, Level 2',
      phone: '+962 6 234 5678',
    },
    {
      id: '3',
      name: 'Airport Branch',
      address: '789 Airport Road, Terminal 1',
      phone: '+962 6 345 6789',
    },
  ];

  // Build business object
  const business = useMemo(() => {
    if (routeBusiness) {
      return {
        id: routeBusiness.id,
        name: routeBusiness.name || 'Elite Beauty Salon',
        category: routeBusiness.category,
        rating: routeBusiness.rating || 4.8,
        distance: routeBusiness.distance,
        image: routeBusiness.image || allBusinessImages[0],
        branches: mockBranches,
        images: routeBusiness.image 
          ? [routeBusiness.image, ...allBusinessImages.filter(img => img !== routeBusiness.image)]
          : allBusinessImages,
      };
    }
    
    return {
      id: '1',
      name: 'Elite Beauty Salon',
      rating: 4.8,
      category: 'Beauty Salon',
      branches: mockBranches,
      images: allBusinessImages,
      image: allBusinessImages[0],
    };
  }, [routeBusiness]);

  // Note: Header title is now managed entirely by navigation via route params
  // No screen-level header configuration allowed per design constraints

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'About' },
  ];

  // Service categories
  const serviceCategories = [
    { id: 'all', label: 'All' },
    { id: 'featured', label: 'Featured' },
    { id: 'packages', label: 'Packages' },
    { id: 'facial', label: 'Facial' },
    { id: 'haircare', label: 'Haircare' },
    { id: 'nailcare', label: 'Nail Care' },
  ];

  // Mock services data
  const mockServices = [
    {
      id: '1',
      title: 'Hair And Beard Cut',
      duration: '1 hr',
      price: '15 JD',
      category: 'haircare',
      description: 'Professional haircut and beard grooming',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Haircut',
      duration: '45 mins',
      price: '10 JD',
      category: 'haircare',
      description: 'Classic men\'s haircut',
      isFeatured: true,
    },
    {
      id: '3',
      title: 'Styling',
      duration: '10 mins',
      price: '5 JD',
      category: 'haircare',
      description: 'Professional hair styling',
      isFeatured: true,
    },
    {
      id: '4',
      title: 'Full Grooming Package',
      duration: '2 hrs',
      price: '35 JD',
      category: 'packages',
      description: 'Complete grooming experience',
      isFeatured: true,
    },
    {
      id: '5',
      title: 'Premium Facial Treatment',
      duration: '1.5 hrs',
      price: '45 JD',
      category: 'facial',
      description: 'Deep cleansing and hydration',
      isFeatured: true,
    },
    {
      id: '6',
      title: 'Gel Manicure & Pedicure',
      duration: '1.5 hrs',
      price: '55 JD',
      category: 'nailcare',
      description: 'Long-lasting gel finish',
      isFeatured: false,
    },
    {
      id: '7',
      title: 'Beard Trim',
      duration: '30 mins',
      price: '8 JD',
      category: 'haircare',
      description: 'Professional beard trimming',
      isFeatured: false,
    },
    {
      id: '8',
      title: 'Deep Cleansing Facial',
      duration: '1 hr',
      price: '30 JD',
      category: 'facial',
      description: 'Deep pore cleansing facial',
      isFeatured: false,
    },
    {
      id: '9',
      title: 'Classic Manicure',
      duration: '45 mins',
      price: '20 JD',
      category: 'nailcare',
      description: 'Classic nail care service',
      isFeatured: false,
    },
  ];

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    if (activeServiceCategory === 'all') {
      return mockServices;
    }
    if (activeServiceCategory === 'featured') {
      return mockServices.filter(service => service.isFeatured);
    }
    return mockServices.filter(service => service.category === activeServiceCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServiceCategory]);

  // Mock team members data
  const mockTeam = [
    {
      id: '1',
      name: 'Ahmed Al-Mansoori',
      role: 'Senior Stylist',
      experience: 8,
      specialties: ['Haircuts', 'Styling', 'Coloring'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Beauty Specialist',
      experience: 5,
      specialties: ['Facial', 'Skincare', 'Makeup'],
    },
    {
      id: '3',
      name: 'Mohammed Hassan',
      role: 'Master Barber',
      experience: 12,
      specialties: ['Beard Grooming', 'Classic Cuts', 'Hot Towel Shave'],
    },
    {
      id: '4',
      name: 'Layla Al-Zahra',
      role: 'Nail Art Specialist',
      experience: 6,
      specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    },
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: '1',
      userName: 'Omar Ali',
      rating: 5,
      date: '2 days ago',
      service: 'Haircut',
      comment: 'Excellent service! The stylist was very professional and the result exceeded my expectations. Highly recommended!',
    },
    {
      id: '2',
      userName: 'Fatima Ahmed',
      rating: 5,
      date: '1 week ago',
      service: 'Facial Treatment',
      comment: 'Amazing experience! My skin feels so refreshed and the staff was very friendly and knowledgeable.',
    },
    {
      id: '3',
      userName: 'Khalid Ibrahim',
      rating: 4,
      date: '2 weeks ago',
      service: 'Beard Trim',
      comment: 'Great service overall. The barber was skilled and the atmosphere was relaxing. Will definitely come back.',
    },
    {
      id: '4',
      userName: 'Noor Al-Din',
      rating: 5,
      date: '3 weeks ago',
      service: 'Full Grooming Package',
      comment: 'Best grooming experience I\'ve had! Everything was perfect from start to finish. Worth every penny.',
    },
  ];

  // Map service categories to professional specialties
  const getMatchingSpecialties = (serviceCategory) => {
    const categoryMap = {
      haircare: ['Haircuts', 'Styling', 'Beard Grooming', 'Classic Cuts', 'Coloring'],
      facial: ['Facial', 'Skincare', 'Makeup'],
      nailcare: ['Manicure', 'Pedicure', 'Nail Art'],
      packages: ['Haircuts', 'Styling', 'Beard Grooming', 'Classic Cuts', 'Facial', 'Skincare', 'Manicure', 'Pedicure'],
    };
    return categoryMap[serviceCategory] || [];
  };

  // Filter professionals based on service category
  const getAvailableProfessionals = (service) => {
    if (!service) return [];
    
    const matchingSpecialties = getMatchingSpecialties(service.category);
    
    return mockTeam.filter(professional => {
      return professional.specialties.some(specialty =>
        matchingSpecialties.some(match => 
          specialty.toLowerCase().includes(match.toLowerCase()) ||
          match.toLowerCase().includes(specialty.toLowerCase())
        )
      );
    });
  };

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

  // Handle continue button press
  const handleContinue = () => {
    // TODO: Navigate to booking/checkout screen
    console.log('Continue with selected services:', selectedServices);
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
            <View style={styles.teamGrid}>
              {mockTeam.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={styles.tabContent}>
            {mockReviews.map((review) => (
              <ReviewListItem
                key={review.id}
                userName={review.userName}
                rating={review.rating}
                date={review.date}
                service={review.service}
                comment={review.comment}
              />
            ))}
          </View>
        );

      case 'about':
        return (
          <View style={styles.tabContent}>
            <InfoCard
              icon="information-circle-outline"
              title="About"
              content="We are a premier beauty and wellness salon dedicated to providing exceptional services that enhance your natural beauty and boost your confidence. With years of experience and a team of skilled professionals, we offer a wide range of services tailored to meet your unique needs."
            />
            <InfoCard
              icon="time-outline"
              title="Operating Hours"
              content="Sunday - Thursday: 9:00 AM - 9:00 PM\nFriday - Saturday: 10:00 AM - 10:00 PM"
            />
            <InfoCard
              icon="location-outline"
              title="Locations"
              content={`${business.branches?.length || 0} convenient locations across the city`}
            />
          </View>
        );

      default:
        return null;
    }
  };

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
      >
        <BusinessHero images={business.images} />
        
        <BusinessInfo
          name={business.name}
          category={business.category}
          rating={business.rating}
          branches={business.branches}
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
});

export default BusinessScreen;

