import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useScrollChannelContext } from '../../contexts/ScrollContext';
import CustomHeader from '../CustomHeader/CustomHeader';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const AnimatedHeader = ({ title, onBackPress, showBackButton, rightComponent, threshold = 100 }) => {
  const { scheme, colors } = useTheme();
  const { activeScrollChannel } = useScrollChannelContext();
  const insets = useSafeAreaInsets();
  const isDark = scheme === 'dark';

  // Gracefully handle null (no scroll channel active)
  const scrollY = activeScrollChannel?.scrollY || new Animated.Value(0);

  // Header animations based on scroll threshold
  const headerOpacity = scrollY.interpolate({
    inputRange: [threshold, threshold + 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [threshold, threshold + 50],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  // Floating back button - driven by explicit scroll thresholds (not inverse opacity)
  // Shows when scrolled past threshold (collapsed state)
  const floatingBackButtonOpacity = scrollY.interpolate({
    inputRange: [threshold, threshold + 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const floatingBackButtonTranslateY = scrollY.interpolate({
    inputRange: [threshold, threshold + 50],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  return (
    <>
      {/* Main Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
        pointerEvents="box-none"
      >
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={styles.blurView}
        >
          <CustomHeader
            title={title}
            onBackPress={onBackPress}
            showBackButton={showBackButton}
            rightComponent={rightComponent}
          />
        </BlurView>
      </Animated.View>

      {/* Floating Back Button (shown when header is hidden) */}
      {showBackButton && onBackPress && (
        <Animated.View
          style={[
            styles.floatingBackButtonContainer,
            {
              top: insets.top + SPACING.md,
              opacity: floatingBackButtonOpacity,
              transform: [{ translateY: floatingBackButtonTranslateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.floatingBackButton}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={[styles.floatingBackButtonInner, { backgroundColor: colors.backgroundLight }]}>
              <Ionicons name="arrow-back" size={22} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  blurView: {
    overflow: 'hidden',
  },
  floatingBackButtonContainer: {
    position: 'absolute',
    left: SPACING.lg,
    zIndex: 1000,
  },
  floatingBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBackButtonInner: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SIZES.shadow.small,
  },
});

AnimatedHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func,
  showBackButton: PropTypes.bool,
  rightComponent: PropTypes.node,
  threshold: PropTypes.number,
};

AnimatedHeader.defaultProps = {
  onBackPress: undefined,
  showBackButton: true,
  rightComponent: null,
  threshold: 100,
};

export default AnimatedHeader;
