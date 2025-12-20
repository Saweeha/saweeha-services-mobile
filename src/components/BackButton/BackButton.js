import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import styles from './BackButton.styles';

const BackButton = ({ topOffset }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <View style={[styles.container, { top: (topOffset || insets.top) + SPACING.md, left: SPACING.lg }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.buttonContainer, { backgroundColor: colors.backgroundLight }]}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

BackButton.propTypes = {
  topOffset: PropTypes.number,
};

export default React.memo(BackButton);

