import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CategoryCard.styles';
import { COLORS } from '../../constants/colors';

const CategoryCard = React.memo(({ name, icon, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={COLORS.textWhite} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
});

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

CategoryCard.defaultProps = {
  color: COLORS.primary,
};

export default CategoryCard;

