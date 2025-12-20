import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import ContinueButton from '../ContinueButton/ContinueButton';

const FloatingContinueButton = React.memo(({ 
  visible, 
  onPress, 
  count,
  label = 'Continue',
  icon,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: insets.bottom + SPACING.md,
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
        <View style={styles.shadowContainer}>
          <ContinueButton
            label={label}
            onPress={onPress}
            count={count}
            style={styles.button}
            icon={icon}
          />
        </View>
      </View>
    </Animated.View>
  );
});

FloatingContinueButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  count: PropTypes.number,
  label: PropTypes.string,
  icon: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: SPACING.md,
  },
  wrapper: {
    borderRadius: SPACING.md,
    padding: SPACING.xs,
  },
  shadowContainer: {
    ...SIZES.shadow.large,
  },
  button: {
    width: '100%',
  },
});

export default FloatingContinueButton;

