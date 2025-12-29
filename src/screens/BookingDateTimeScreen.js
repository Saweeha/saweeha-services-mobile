import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import AutoScrollView from '../components/list/AutoScrollView/AutoScrollView';
import DatePicker from '../components/booking/DatePicker/DatePicker';
import TimeSlotPicker from '../components/booking/TimeSlotPicker/TimeSlotPicker';
import ContinueButton from '../components/ui/ContinueButton/ContinueButton';
import FloatingContinueButton from '../components/ui/FloatingContinueButton/FloatingContinueButton';
import BookingConfirmationModal from '../components/modals/BookingConfirmationModal/BookingConfirmationModal';

import { SPACING } from '../constants/spacing';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';
import { useAuthGuard } from '../hooks/useAuthGuard';

const BookingDateTimeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  useAuthGuard('BookingDateTime');
  const { selectedServices, business } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(
    business?.branches?.[0] || null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    setBookingDetails({
      business,
      branch: selectedBranch,
      date: selectedDate,
      time: selectedTime,
      services: selectedServices,
    });
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            state: {
              routes: [{ name: 'Home' }],
              index: 0,
            },
          },
        ],
      })
    );
    setShowConfirmation(false);
  };

  const handleScroll = useCallback((event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 100;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  }, []);

  const canConfirm = selectedDate && selectedTime;

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
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Select Date & Time
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose your preferred appointment date and time
          </Text>
        </View>

        {selectedServices && selectedServices.length > 0 && (
          <View style={[styles.summaryCard, { backgroundColor: colors.backgroundLight }]}>
            <View style={styles.summaryHeader}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                Selected Services
              </Text>
              <Text style={[styles.serviceCount, { color: colors.primary }]}>
                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}
              </Text>
            </View>
            {selectedServices.map((service, index) => (
              <View
                key={service.id || index}
                style={[
                  styles.serviceItem,
                  index > 0 && { borderTopColor: colors.border },
                ]}
              >
                <View style={styles.serviceInfo}>
                  <Text style={[styles.serviceName, { color: colors.text }]}>
                    {service.title}
                  </Text>
                  {service.selectedProfessional && (
                    <Text
                      style={[styles.professionalName, { color: colors.textSecondary }]}
                    >
                      with {service.selectedProfessional.name}
                    </Text>
                  )}
                </View>
                <Text style={[styles.servicePrice, { color: colors.primary }]}>
                  {service.price}
                </Text>
              </View>
            ))}
          </View>
        )}

        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {selectedDate && (
          <TimeSlotPicker
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            selectedDate={selectedDate}
          />
        )}

        {canConfirm && (
          <View style={styles.buttonContainer}>
            <ContinueButton
              label="Confirm Booking"
              onPress={handleConfirm}
              icon="arrow-forward"
            />
          </View>
        )}
      </AutoScrollView>

      <FloatingContinueButton
        visible={canConfirm && !isAtBottom}
        onPress={handleConfirm}
        label="Confirm Booking"
        icon="arrow-forward"
      />

      <BookingConfirmationModal
        visible={showConfirmation}
        bookingDetails={bookingDetails}
        onConfirm={handleConfirmationClose}
        onClose={handleConfirmationClose}
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
  header: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  summaryCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: SIZES.radius.md,
    ...SIZES.shadow.small,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  serviceCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
  },
  serviceInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs / 2,
  },
  professionalName: {
    fontSize: 14,
    fontWeight: '400',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
});

export default BookingDateTimeScreen;

