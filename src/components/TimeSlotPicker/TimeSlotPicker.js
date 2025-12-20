import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const TimeSlotPicker = React.memo(({ selectedTime, onTimeSelect, selectedDate }) => {
  const { colors } = useTheme();

  // Generate time slots from 9 AM to 9 PM in 30-minute intervals
  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 9;
    const endHour = 21; // 9 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTime(hour, minute);
        slots.push({ time, displayTime });
      }
    }
    
    return slots;
  }, []);

  function formatTime(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  const isSelected = (time) => {
    return selectedTime === time;
  };

  const isPastTime = (time) => {
    if (!selectedDate) return false;
    const now = new Date();
    const selected = new Date(selectedDate);
    const isToday =
      selected.getDate() === now.getDate() &&
      selected.getMonth() === now.getMonth() &&
      selected.getFullYear() === now.getFullYear();

    if (!isToday) return false;

    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Select Time</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.timeGrid}>
          {timeSlots.map((slot, index) => {
            const selected = isSelected(slot.time);
            const past = isPastTime(slot.time);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  {
                    backgroundColor: selected
                      ? colors.primary
                      : past
                      ? colors.backgroundSecondary
                      : colors.backgroundLight,
                    borderColor: selected
                      ? colors.primary
                      : past
                      ? colors.border
                      : colors.border,
                    opacity: past ? 0.5 : 1,
                  },
                ]}
                onPress={() => !past && onTimeSelect(slot.time)}
                disabled={past}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.timeText,
                    {
                      color: selected
                        ? colors.textWhite
                        : past
                        ? colors.textLight
                        : colors.text,
                    },
                  ]}
                >
                  {slot.displayTime}
                </Text>
                {selected && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.textWhite} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

TimeSlotPicker.propTypes = {
  selectedTime: PropTypes.string,
  onTimeSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    flex: 1,
    minWidth: '30%',
    maxWidth: '48%',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: SIZES.radius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SPACING.xs,
    ...SIZES.shadow.small,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TimeSlotPicker;

