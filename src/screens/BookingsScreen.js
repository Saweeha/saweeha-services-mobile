import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BookingCard from '../components/cards/BookingCard/BookingCard';
import CustomTabs from '../components/ui/CustomTabs/CustomTabs';
import ScreenHeader from '../components/layout/ScreenHeader/ScreenHeader';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';
import { useAuthGuard } from '../hooks/useAuthGuard';

const BookingsScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  useAuthGuard('Bookings');
  const [activeTab, setActiveTab] = useState('upcoming');

  const [bookings] = useState([
    {
      id: '1',
      business: {
        name: 'Elite Beauty Salon',
        category: 'Beauty & Spa',
        image: require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
      },
      branch: {
        name: 'Downtown Branch',
        address: '123 Main St',
      },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      services: [
        { id: '1', title: 'Haircut & Styling', price: '$45' },
        { id: '2', title: 'Beard Trim', price: '$20' },
      ],
      status: 'upcoming',
    },
    {
      id: '2',
      business: {
        name: 'Zen Wellness Center',
        category: 'Wellness',
        image: require('../../assets/businesses/pexels-element5-973402.jpg'),
      },
      branch: {
        name: 'Main Branch',
        address: '456 Oak Ave',
      },
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: '2:30 PM',
      services: [{ id: '3', title: 'Full Body Massage', price: '$80' }],
      status: 'upcoming',
    },
    {
      id: '3',
      business: {
        name: 'ABC Salon',
        category: 'Fitness',
        image: require('../../assets/businesses/pexels-thgusstavo-1813272.jpg'),
      },
      branch: {
        name: 'Central Branch',
        address: '789 Park Blvd',
      },
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      time: '9:00 AM',
      services: [{ id: '4', title: 'Personal Training Session', price: '$60' }],
      status: 'completed',
    },
    {
      id: '4',
      business: {
        name: 'Luxury Spa & Massage',
        category: 'Spa & Wellness',
        image: require('../../assets/businesses/pexels-delbeautybox-211032-853427.jpg'),
      },
      branch: {
        name: 'Waterfront Branch',
        address: '321 Harbor Dr',
      },
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      time: '11:00 AM',
      services: [
        { id: '5', title: 'Facial Treatment', price: '$75' },
        { id: '6', title: 'Manicure', price: '$35' },
      ],
      status: 'completed',
    },
    {
      id: '5',
      business: {
        name: 'Premium Hair Studio',
        category: 'Beauty & Spa',
        image: require('../../assets/businesses/pexels-delbeautybox-211032-705255.jpg'),
      },
      branch: {
        name: 'Uptown Branch',
        address: '654 High St',
      },
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      time: '3:00 PM',
      services: [{ id: '7', title: 'Hair Color', price: '$120' }],
      status: 'cancelled',
    },
  ]);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') {
      return bookings;
    }
    return bookings.filter((booking) => booking.status === activeTab);
  }, [bookings, activeTab]);

  const handleCancel = (booking) => {
    Alert.alert(
      'Booking Cancelled',
      `Your booking at ${booking.business?.name} has been cancelled.`,
      [{ text: 'OK' }]
    );
    console.log('Cancel booking:', booking.id);
  };


  const renderBookingItem = ({ item, index }) => {
    const isLastItem = index === filteredBookings.length - 1;

    return (
      <View
        style={[
          styles.bookingWrapper,
          { marginBottom: isLastItem ? 0 : SPACING.md },
        ]}
      >
        <BookingCard booking={item} onCancel={handleCancel} />
      </View>
    );
  };

  const renderEmptyState = () => {
    const emptyMessages = {
      upcoming: {
        icon: 'calendar-outline',
        title: 'No Upcoming Bookings',
        subtitle: 'You don\'t have any upcoming appointments scheduled',
      },
      completed: {
        icon: 'checkmark-circle-outline',
        title: 'No Completed Bookings',
        subtitle: 'Your completed bookings will appear here',
      },
      cancelled: {
        icon: 'close-circle-outline',
        title: 'No Cancelled Bookings',
        subtitle: 'You haven\'t cancelled any bookings',
      },
      all: {
        icon: 'calendar-outline',
        title: 'No Bookings Yet',
        subtitle: 'Start booking services to see them here',
      },
    };

    const message = emptyMessages[activeTab] || emptyMessages.all;

    return (
      <View style={styles.emptyContainer}>
        <View style={[styles.emptyIconContainer, { backgroundColor: colors.border }]}>
          <Ionicons name={message.icon} size={64} color={colors.textLight} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>{message.title}</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textLight }]}>
          {message.subtitle}
        </Text>
      </View>
    );
  };

  const getBookingCount = () => {
    return filteredBookings.length;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ScreenHeader
        title="My Bookings"
        count={filteredBookings.length > 0 ? getBookingCount() : undefined}
        countLabel="booking"
      />

      <CustomTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
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
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SIZES.tabBarHeight + SPACING.md,
  },
  bookingWrapper: {
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
    opacity: 0.6,
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

export default BookingsScreen;

