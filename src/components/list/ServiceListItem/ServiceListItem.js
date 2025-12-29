import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createServiceListItemStyles from './ServiceListItem.styles';

const ServiceListItem = React.memo(
  ({ title, duration, price, description, isSelected, selectedProfessional, onPress, onLongPress }) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createServiceListItemStyles(colors), [colors]);

    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundLight,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
              {title}
            </Text>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: isSelected ? colors.primary : 'transparent',
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={16} color={colors.textWhite} />
              )}
            </View>
          </View>

          {description && (
            <Text
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {description}
            </Text>
          )}

          {isSelected && selectedProfessional && (
            <View style={[styles.professionalBadge, { backgroundColor: colors.primary }]}>
              <Ionicons name="person" size={14} color={colors.textWhite} />
              <Text style={[styles.professionalText, { color: colors.textWhite }]} numberOfLines={1}>
                {selectedProfessional.name}
              </Text>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.metaInfo}>
              <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {duration}
              </Text>
            </View>
            <Text style={[styles.price, { color: colors.primary }]}>{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

ServiceListItem.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
  selectedProfessional: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

export default ServiceListItem;


