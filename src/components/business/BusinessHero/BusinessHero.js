import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Dimensions, ScrollView, Animated, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { SPACING } from '../../../constants/spacing';
import createBusinessHeroStyles from './BusinessHero.styles';

const { width, height } = Dimensions.get('window');

// Module-level cache to track loaded image URLs (persists across re-renders)
const loadedImagesCache = new Set();

// Clean ProgressiveImage component - shows thumbnail until original loads
const ProgressiveImage = React.memo(({ source, thumbnail, style, resizeMode = 'cover' }) => {
  const imageUri = source?.uri;
  const [isLoaded, setIsLoaded] = useState(imageUri ? loadedImagesCache.has(imageUri) : true);
  const fadeAnim = useRef(new Animated.Value(isLoaded ? 1 : 0)).current;

  const handleLoad = () => {
    if (imageUri && !loadedImagesCache.has(imageUri)) {
      loadedImagesCache.add(imageUri);
      setIsLoaded(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  // No thumbnail or local image - just render normally
  if (!thumbnail || !imageUri) {
    return <Image source={source} style={style} resizeMode={resizeMode} />;
  }

  const thumbnailOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={style}>
      {/* Thumbnail - fades out as original fades in */}
      <Animated.Image
        source={{ uri: thumbnail }}
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style, { opacity: thumbnailOpacity }]}
        resizeMode={resizeMode}
        blurRadius={2}
      />
      {/* Original - fades in over thumbnail */}
      <Animated.Image
        source={source}
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, style, { opacity: fadeAnim }]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
      />
    </View>
  );
});

const BusinessHero = React.memo(({ images = [] }) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const styles = useMemo(() => createBusinessHeroStyles(colors), [colors]);
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const expandedScrollViewRef = useRef(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Helper function to get image source from the new format
  const getImageSource = (image) => {
    if (!image) return null;
    // If it has a uri property (API image)
    if (image.uri) return { uri: image.uri };
    // If it has a source property (local image)
    if (image.source) return image.source;
    // If it's a number (require() result) or has uri directly
    if (typeof image === 'number') return image;
    return image;
  };

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
          removeClippedSubviews={false}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              activeOpacity={0.9}
              onPress={handleImagePress}
            >
              <ProgressiveImage
                source={getImageSource(image)}
                thumbnail={image?.thumbnail}
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

        {/* Favorite Button */}
        <View style={styles.favoriteButtonContainer}>
          <TouchableOpacity
            style={styles.favoriteButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => setIsFavorited(!isFavorited)}
          >
            <BlurView
              intensity={80}
              tint={isDark ? 'dark' : 'light'}
              style={styles.favoriteButtonBlur}
            >
              <Ionicons
                name={isFavorited ? "heart" : "heart-outline"}
                size={24}
                color="#EF4444"
              />
            </BlurView>
          </TouchableOpacity>
        </View>

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
            removeClippedSubviews={false}
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
                <ProgressiveImage
                  source={getImageSource(image)}
                  thumbnail={image?.thumbnail}
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

export default BusinessHero;


