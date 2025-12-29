import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import createStyles from './PromotionSwiper.styles';
import { useTheme } from '../../../hooks/useTheme';

const PromotionSwiper = React.memo(({ promotions = [], onPress }) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const styles = createStyles(colors, isDark);
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!promotions || promotions.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => {
        const nextPage = (prevPage + 1) % promotions.length;
        pagerRef.current?.setPage(nextPage);
        return nextPage;
      });
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [promotions.length]);

  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  if (!promotions || promotions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageSelected}
        autoplay={true}
        autoplayInterval={4000}
        loop={true}
      >
        {promotions.map((promotion, index) => (
          <View key={promotion.id || index} style={styles.page}>
            <TouchableOpacity
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
                  <Ionicons name="image-outline" size={48} color={colors.textLight} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>
      {promotions.length > 1 && (
        <View style={styles.paginationContainer}>
          <BlurView
            intensity={80}
            tint={isDark ? 'dark' : 'light'}
            style={styles.paginationBlur}
          >
            <View style={styles.pagination}>
              {promotions.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentPage && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </BlurView>
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

