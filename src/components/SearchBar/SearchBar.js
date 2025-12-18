import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SearchBar.styles';
import { COLORS } from '../../constants/colors';

const SearchBar = React.memo(
  ({ value, onChangeText, placeholder = 'Search services...' }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
          <Ionicons
            name="search"
            size={20}
            color={isFocused ? COLORS.primary : COLORS.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textLight}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {value?.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText?.('')}>
              <Ionicons name="close" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

SearchBar.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;


