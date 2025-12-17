import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './BusinessCard.styles';
import { COLORS } from '../../constants/colors';

const BusinessCard = React.memo(({ name, category, rating, distance, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={image || require('../../../assets/adaptive-icon.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Ionicons name="location" size={14} color={COLORS.textLight} />
            <Text style={styles.distance}>{distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

BusinessCard.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  distance: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onPress: PropTypes.func,
};

export default BusinessCard;

