import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, ScrollView, StyleSheet, Animated, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = width * 0.7;

const BusinessHero = React.memo(({ images = [] }) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const autoplayIntervalRef = useRef(null);
  const expandedScrollViewRef = useRef(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Auto-play: advance slide every 4 seconds
  useEffect(() => {
    if (!images || images.length <= 1 || isAutoplayPaused) {
      return;
    }

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [images.length, isAutoplayPaused]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      },
    }
  );

  const handleImagePress = () => {
    setIsAutoplayPaused(true);
    setExpandedIndex(currentIndex);
    setIsExpanded(true);
    // Scroll expanded view to current image
    setTimeout(() => {
      expandedScrollViewRef.current?.scrollTo({
        x: currentIndex * width,
        animated: false,
      });
    }, 100);
  };

  const handleCloseExpanded = () => {
    setIsExpanded(false);
    setIsAutoplayPaused(false);
  };

  const handleExpandedScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setExpandedIndex(index);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              activeOpacity={0.9}
              onPress={handleImagePress}
            >
              <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)']}
                style={styles.gradient}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {images.length > 1 && (
          <View style={styles.paginationContainer}>
            <BlurView
              intensity={80}
              tint={isDark ? 'dark' : 'light'}
              style={styles.paginationBlur}
            >
              <View style={styles.pagination}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentIndex && styles.paginationDotActive,
                      {
                        backgroundColor:
                          index === currentIndex
                            ? colors.primaryLight
                            : isDark
                            ? colors.textLight
                            : colors.textWhite,
                        opacity: index === currentIndex ? 1 : isDark ? 0.7 : 0.5,
                      },
                    ]}
                  />
                ))}
              </View>
            </BlurView>
          </View>
        )}
      </View>

      {/* Full Screen Image Viewer Modal */}
      <Modal
        visible={isExpanded}
        transparent
        animationType="fade"
        onRequestClose={handleCloseExpanded}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseExpanded}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={styles.closeButtonBlur}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </BlurView>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={expandedScrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleExpandedScroll}
            scrollEventThrottle={16}
            style={styles.expandedScrollView}
            contentContainerStyle={styles.expandedScrollContent}
          >
            {images.map((image, index) => (
              <ScrollView
                key={index}
                style={styles.zoomableContainer}
                contentContainerStyle={styles.zoomableContent}
                maximumZoomScale={3}
                minimumZoomScale={1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bouncesZoom={true}
              >
                <Image
                  source={image}
                  style={styles.expandedImage}
                  resizeMode="contain"
                />
              </ScrollView>
            ))}
          </ScrollView>

          {images.length > 1 && (
            <View style={styles.expandedPaginationContainer}>
              <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={styles.paginationBlur}
              >
                <View style={styles.pagination}>
                  {images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === expandedIndex && styles.paginationDotActive,
                        {
                          backgroundColor:
                            index === expandedIndex
                              ? colors.primaryLight
                              : isDark
                              ? colors.textLight
                              : colors.textWhite,
                          opacity: index === expandedIndex ? 1 : isDark ? 0.7 : 0.5,
                        },
                      ]}
                    />
                  ))}
                </View>
              </BlurView>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
});

BusinessHero.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
};

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  imageContainer: {
    width,
    height: HERO_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  paginationBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paginationDotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalHeader: {
    position: 'absolute',
    top: SPACING.xxxl,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.md,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    zIndex: 11,
  },
  closeButtonBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: SPACING.sm,
  },
  expandedScrollView: {
    flex: 1,
  },
  expandedScrollContent: {
    alignItems: 'center',
  },
  zoomableContainer: {
    width,
    height,
  },
  zoomableContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedImage: {
    width: width,
    height: height,
  },
  expandedPaginationContainer: {
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default BusinessHero;

