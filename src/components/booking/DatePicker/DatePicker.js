import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const DatePicker = React.memo(({ selectedDate, onDateSelect, minDate }) => {
  const { colors } = useTheme();

  // Generate dates for the next 30 days
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const startDate = minDate ? new Date(minDate) : today;
    
    // Start from today or minDate, whichever is later
    const start = startDate > today ? startDate : today;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  }, [minDate]);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    return { day, month, weekday };
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Select Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {availableDates.map((date, index) => {
          const { day, month, weekday } = formatDate(date);
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCard,
                {
                  backgroundColor: selected
                    ? colors.primary
                    : today
                    ? colors.primaryLight
                    : colors.backgroundLight,
                  borderColor: selected
                    ? colors.primary
                    : today
                    ? colors.primary
                    : colors.border,
                },
              ]}
              onPress={() => onDateSelect(date)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.weekday,
                  {
                    color: selected
                      ? colors.textWhite
                      : today
                      ? colors.primary
                      : colors.textSecondary,
                  },
                ]}
              >
                {weekday}
              </Text>
              <Text
                style={[
                  styles.day,
                  {
                    color: selected
                      ? colors.textWhite
                      : today
                      ? colors.primary
                      : colors.text,
                  },
                ]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.month,
                  {
                    color: selected
                      ? colors.textWhite
                      : today
                      ? colors.primary
                      : colors.textSecondary,
                  },
                ]}
              >
                {month}
              </Text>
              {today && !selected && (
                <View style={[styles.todayBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.todayText, { color: colors.textWhite }]}>Today</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  dateCard: {
    width: 70,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    ...SIZES.shadow.small,
  },
  weekday: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: SPACING.xs / 2,
    textTransform: 'uppercase',
  },
  day: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.xs / 2,
  },
  month: {
    fontSize: 12,
    fontWeight: '500',
  },
  todayBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 8,
  },
  todayText: {
    fontSize: 8,
    fontWeight: '700',
  },
});

export default DatePicker;

