import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../../hooks/useTheme';
import createBookingConfirmationModalStyles from './BookingConfirmationModal.styles';
import ContinueButton from '../../ui/ContinueButton/ContinueButton';

const BookingConfirmationModal = ({
  visible,
  bookingDetails,
  onClose,
  onConfirm,
}) => {
  const { colors, scheme } = useTheme();
  const styles = useMemo(() => createBookingConfirmationModalStyles(colors), [colors]);
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
              <View style={[styles.iconContainer, { backgroundColor: colors.successLight }]}>
                <Ionicons name="checkmark-circle" size={64} color={colors.success} />
              </View>

              <Text style={[styles.title, { color: colors.text }]}>
                Booking Confirmed!
              </Text>

              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Your appointment has been successfully booked
              </Text>

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

export default BookingConfirmationModal;


