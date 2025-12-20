import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './BusinessCard.styles';
import { useTheme } from '../../hooks/useTheme';

const BusinessCard = React.memo(({ name, category, rating, distance, image, onPress, cardWidth }) => {
  const { colors, scheme } = useTheme();
  const styles = createStyles(colors, cardWidth);
  const isDark = scheme === 'dark';

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

      <BlurView
        intensity={80}
        tint={isDark ? 'dark' : 'light'}
        style={styles.ratingContainer}
      >
        <Ionicons name="star" size={14} color={colors.warning} />
        <Text style={styles.rating}>{rating}</Text>
      </BlurView>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>
        <View style={styles.distanceContainer}>
          <Ionicons name="location" size={14} color={colors.textLight} />
          <Text style={styles.distance}>{distance}</Text>
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
  cardWidth: PropTypes.number,
};

export default BusinessCard;

