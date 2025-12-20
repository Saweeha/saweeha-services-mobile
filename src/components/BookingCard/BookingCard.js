import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { SIZES } from '../../constants/sizes';
import { useTheme } from '../../hooks/useTheme';

const BookingCard = React.memo(({ booking, onCancel }) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

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
  const isCompleted = booking.status === 'completed';

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
            source={booking.business?.image || require('../../../assets/adaptive-icon.png')}
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
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.backgroundLight, borderColor: colors.error + '40' },
                ]}
                onPress={handleCancel}
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

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    ...SIZES.shadow.small,
  },
  header: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radius.sm,
    marginRight: SPACING.md,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.xs / 2,
  },
  category: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginBottom: SPACING.xs,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginLeft: SPACING.xs / 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: SIZES.radius.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  expandedContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderTopWidth: 1,
  },
  fullDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  fullDateText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  servicesContainer: {
    marginBottom: SPACING.md,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderTopWidth: 1,
  },
  serviceName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    flex: 1,
  },
  servicePrice: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  branchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.xs / 2,
  },
  branchAddress: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: SIZES.radius.sm,
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  totalPrice: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radius.sm,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
});

export default BookingCard;

