import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../../constants/spacing';
import { useTheme } from '../../../hooks/useTheme';
import createBookingCardStyles from './BookingCard.styles';

const BookingCard = React.memo(({ booking, onCancel }) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = useMemo(() => createBookingCardStyles(colors), [colors]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming':
        return {
          color: colors.primary,
          bgColor: colors.primary + '15',
          label: 'Upcoming',
        };
      case 'completed':
        return {
          color: colors.success,
          bgColor: colors.success + '15',
          label: 'Completed',
        };
      case 'cancelled':
        return {
          color: colors.error,
          bgColor: colors.error + '15',
          label: 'Cancelled',
        };
      default:
        return {
          color: colors.textSecondary,
          bgColor: colors.border,
          label: status,
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return '';
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (d.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (d.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      }

      const options = { month: 'short', day: 'numeric' };
      return d.toLocaleDateString('en-US', options);
    } catch (error) {
      return '';
    }
  };

  const formatFullDate = (date) => {
    if (!date) return '';
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return '';
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      return d.toLocaleDateString('en-US', options);
    } catch (error) {
      return '';
    }
  };

  const totalPrice = booking.services?.reduce((sum, service) => {
    const price = parseFloat(service.price?.replace(/[^0-9.]/g, '')) || 0;
    return sum + price;
  }, 0) || 0;

  const statusConfig = getStatusConfig(booking.status);
  const isUpcoming = booking.status === 'upcoming';

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => onCancel?.(booking),
        },
      ]
    );
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundLight, borderColor: colors.border }]}>
      {/* Header Section */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.header}>
          <Image
            source={booking.business?.image || require('../../../../assets/adaptive-icon.png')}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Business Info */}
          <View style={styles.businessInfo}>
            <Text style={[styles.businessName, { color: colors.text }]} numberOfLines={1}>
              {booking.business?.name || 'Business Name'}
            </Text>
            <Text style={[styles.category, { color: colors.textSecondary }]} numberOfLines={1}>
              {booking.business?.category || 'Category'}
            </Text>
            <View style={styles.dateTimeRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.primary} />
              <Text style={[styles.dateTimeText, { color: colors.text }]}>
                {formatDate(booking.date)} • {booking.time}
              </Text>
            </View>
          </View>

          {/* Status & Expand */}
          <View style={styles.rightSection}>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={colors.textLight}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Expanded Content */}
      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.border }]}>
          {/* Full Date */}
          <View style={styles.fullDateContainer}>
            <Ionicons name="calendar-outline" size={16} color={colors.textLight} />
            <Text style={[styles.fullDateText, { color: colors.textSecondary, marginLeft: SPACING.xs }]}>
              {formatFullDate(booking.date)} at {booking.time}
            </Text>
          </View>

          {/* Services List */}
          {booking.services && booking.services.length > 0 && (
            <View style={styles.servicesContainer}>
              {booking.services.map((service, index) => (
                <View
                  key={service.id || index}
                  style={[
                    styles.serviceItem,
                    index > 0 && { borderTopColor: colors.border },
                  ]}
                >
                  <Text style={[styles.serviceName, { color: colors.text }]}>
                    {service.title}
                  </Text>
                  <Text style={[styles.servicePrice, { color: colors.text }]}>
                    {service.price}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Branch Info */}
          {booking.branch && (
            <View style={styles.branchContainer}>
              <Ionicons name="location" size={16} color={colors.textLight} />
              <View style={[styles.branchInfo, { marginLeft: SPACING.sm }]}>
                <Text style={[styles.branchName, { color: colors.text }]}>
                  {booking.branch.name}
                </Text>
                <Text style={[styles.branchAddress, { color: colors.textSecondary }]}>
                  {booking.branch.address}
                </Text>
              </View>
            </View>
          )}

          {/* Total Price */}
          <View style={[styles.totalContainer, { backgroundColor: colors.primary + '08' }]}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total</Text>
            <Text style={[styles.totalPrice, { color: colors.primary }]}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          {/* Action Buttons */}
          {isUpcoming && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.backgroundLight, borderColor: colors.error + '40' },
                ]}
              >
                <Text style={[styles.actionButtonText, { color: colors.error }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
});

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    business: PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    }),
    branch: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
    }),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    time: PropTypes.string,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.string,
      })
    ),
    status: PropTypes.oneOf(['upcoming', 'completed', 'cancelled']),
  }).isRequired,
  onCancel: PropTypes.func,
};

export default BookingCard;


