import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { SPACING } from '../../../constants/spacing';
import createFloatingContinueButtonStyles from './FloatingContinueButton.styles';
import ContinueButton from '../ContinueButton/ContinueButton';

const FloatingContinueButton = React.memo(({
  visible,
  onPress,
  count,
  label = 'Continue',
  icon,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createFloatingContinueButtonStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
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

export default FloatingContinueButton;


