import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './PromotionSwiper.styles';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.md * 2;

const PromotionSwiper = React.memo(({ promotions = [], onPress }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  if (!promotions || promotions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {promotions.map((promotion, index) => (
          <TouchableOpacity
            key={promotion.id || index}
            style={styles.card}
            onPress={() => onPress?.(promotion)}
            activeOpacity={0.9}
          >
            {promotion.image ? (
              <Image
                source={promotion.image}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="image-outline" size={48} color={COLORS.textLight} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {promotions.length > 1 && (
        <View style={styles.pagination}>
          {promotions.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
});

PromotionSwiper.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    })
  ),
  onPress: PropTypes.func,
};

export default PromotionSwiper;

