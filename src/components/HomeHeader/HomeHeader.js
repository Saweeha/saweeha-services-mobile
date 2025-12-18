import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './HomeHeader.styles';
import SearchBar from '../SearchBar/SearchBar';
import { useThemeColors } from '../../hooks/useTheme';

const HomeHeader = React.memo(
  ({ title, searchQuery, onChangeSearchQuery, onPressNotifications }) => {
    const colors = useThemeColors();
    const styles = createStyles(colors);

    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onPressNotifications}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <SearchBar value={searchQuery} onChangeText={onChangeSearchQuery} />
      </View>
    );
  }
);

HomeHeader.propTypes = {
  title: PropTypes.string,
  searchQuery: PropTypes.string,
  onChangeSearchQuery: PropTypes.func,
  onPressNotifications: PropTypes.func,
};

HomeHeader.defaultProps = {
  title: 'Discover',
  searchQuery: '',
  onChangeSearchQuery: undefined,
  onPressNotifications: undefined,
};

export default HomeHeader;


