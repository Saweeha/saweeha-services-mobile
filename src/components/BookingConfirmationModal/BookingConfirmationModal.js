import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import ContinueButton from '../ContinueButton/ContinueButton';

const BookingConfirmationModal = ({
  visible,
  bookingDetails,
  onClose,
  onConfirm,
}) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  if (!visible || !bookingDetails) return null;

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContentWrapper}
          >
            <BlurView
              intensity={80}
              tint={isDark ? 'dark' : 'light'}
              style={styles.modalContent}
            >
              {/* Success Icon */}
              <View style={[styles.iconContainer, { backgroundColor: colors.successLight }]}>
                <Ionicons name="checkmark-circle" size={64} color={colors.success} />
              </View>

              {/* Title */}
              <Text style={[styles.title, { color: colors.text }]}>
                Booking Confirmed!
              </Text>

              {/* Subtitle */}
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Your appointment has been successfully booked
              </Text>

              {/* Booking Details */}
              <View style={[styles.detailsContainer, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={20} color={colors.primary} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Location
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                    {bookingDetails.branch.address}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={20} color={colors.primary} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Date
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {formatDate(bookingDetails.date)}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="time" size={20} color={colors.primary} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Time
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {formatTime(bookingDetails.time)}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="list" size={20} color={colors.primary} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Services
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {bookingDetails.services?.length || 0} service{bookingDetails.services?.length !== 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Confirm Button */}
              <View style={styles.buttonContainer}>
                <ContinueButton
                  label="Done"
                  onPress={onConfirm}
                  icon="checkmark"
                />
              </View>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

BookingConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  bookingDetails: PropTypes.shape({
    business: PropTypes.shape({
      name: PropTypes.string,
    }),
    branch: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
    }),
    date: PropTypes.instanceOf(Date),
    time: PropTypes.string,
    services: PropTypes.array,
  }),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentWrapper: {
    width: '85%',
    maxWidth: 400,
  },
  modalContent: {
    width: '100%',
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    alignItems: 'center',
    padding: SPACING.lg,
    ...SIZES.shadow.large,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    borderRadius: SIZES.radius.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  detailContent: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailSubValue: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: SPACING.xs / 2,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default BookingConfirmationModal;

