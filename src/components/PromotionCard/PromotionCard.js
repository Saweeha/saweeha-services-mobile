import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './PromotionCard.styles';
import { COLORS } from '../../constants/colors';

const PromotionCard = React.memo(({ title, subtitle, discount, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={image || require('../../../assets/adaptive-icon.png')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.gradient}>
          <View style={styles.content}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{discount}% OFF</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <View style={styles.footer}>
              <Text style={styles.ctaText}>Book Now</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.textWhite} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

PromotionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onPress: PropTypes.func,
};

export default PromotionCard;

