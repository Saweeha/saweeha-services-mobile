import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import createStyles from './CustomHeader.styles';
import { TYPOGRAPHY } from '../../../constants/typography';
import { useThemeColors } from '../../../hooks/useTheme';

const CustomHeader = React.memo(({
  title,
  onBackPress,
  showBackButton = true,
  rightComponent,
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = 64 + insets.top;
  const colors = useThemeColors();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, { height: headerHeight, paddingTop: insets.top }]}>
      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          {showBackButton && onBackPress ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.backButtonContainer}>
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}

          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>

          <View style={styles.rightContainer}>
            {rightComponent || <View style={styles.placeholder} />}
          </View>
        </View>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
    </View>
  );
});

CustomHeader.propTypes = {
  title: PropTypes.string,
  onBackPress: PropTypes.func,
  showBackButton: PropTypes.bool,
  rightComponent: PropTypes.node,
};

CustomHeader.defaultProps = {
  title: '',
  onBackPress: undefined,
  showBackButton: true,
  rightComponent: null,
};

export default CustomHeader;
