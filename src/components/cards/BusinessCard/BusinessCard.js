import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './BusinessCard.styles';
import { useTheme } from '../../../hooks/useTheme';

const BusinessCard = React.memo(({ name, category, rating, distance, image, onPress, cardWidth }) => {
  const { colors, scheme } = useTheme();
  const styles = createStyles(colors, cardWidth);
  const isDark = scheme === 'dark';

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageOpacity = React.useRef(new Animated.Value(0)).current;

  const onImageLoad = () => {
    setImageLoaded(true);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderImage = () => {
    if (typeof image === 'number') {
      return <Image source={image} style={styles.image} />;
    }

    if (image && typeof image === 'object' && (image.original_url || image.uri)) {
      const originalSource = image.original_url ? { uri: image.original_url } : image;
      const thumbnailSource = image.thumbnail_url ? { uri: image.thumbnail_url } : null;

      return (
        <View style={styles.imageContainer}>
          {thumbnailSource && !imageLoaded && (
            <Image
              source={thumbnailSource}
              style={[styles.image, StyleSheet.absoluteFillObject]}
              blurRadius={1}
            />
          )}

          <Animated.Image
            source={originalSource}
            style={[styles.image, { opacity: imageOpacity }]}
            onLoad={onImageLoad}
          />
        </View>
      );
    }

    return (
      <Image
        source={require('../../../../assets/adaptive-icon.png')}
        style={styles.image}
      />
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {renderImage()}

      <BlurView
        intensity={80}
        tint={isDark ? 'dark' : 'light'}
        style={styles.ratingContainer}
      >
        <Ionicons name="star" size={14} color={colors.warning} />
        <Text style={styles.rating}>{rating || "Not Rated"}</Text>
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
  image: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      original_url: PropTypes.string,
      thumbnail_url: PropTypes.string,
      uri: PropTypes.string
    })
  ]),
  onPress: PropTypes.func,
  cardWidth: PropTypes.number,
};

export default BusinessCard;

