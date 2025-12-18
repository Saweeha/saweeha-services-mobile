import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './HomeHeader.styles';
import { COLORS } from '../../constants/colors';
import SearchBar from '../SearchBar/SearchBar';

const HomeHeader = React.memo(
  ({ title, searchQuery, onChangeSearchQuery, onPressNotifications }) => {
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
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
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


