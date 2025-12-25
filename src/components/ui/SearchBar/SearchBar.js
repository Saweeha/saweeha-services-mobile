import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import createStyles from './SearchBar.styles';
import { useTheme } from '../../../hooks/useTheme';

const SearchBar = React.memo(
  ({ value, onChangeText, placeholder = 'Search services...' }) => {
    const [isFocused, setIsFocused] = useState(false);
    const { colors, scheme } = useTheme();
    const isDark = scheme === 'dark';
    const styles = createStyles(colors, isDark);

    return (
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
          <Ionicons
            name="search"
            size={20}
            color={isFocused ? (isDark ? colors.textWhite : colors.primary) : colors.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {value?.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText?.('')}>
              <Ionicons name="close" size={18} color={colors.textLight} />
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


