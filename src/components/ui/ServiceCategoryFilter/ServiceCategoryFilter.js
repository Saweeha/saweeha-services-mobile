import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import createServiceCategoryFilterStyles from './ServiceCategoryFilter.styles';

const ServiceCategoryFilter = React.memo(({ categories = [], activeCategory, onCategoryChange }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createServiceCategoryFilterStyles(colors), [colors]);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isActive ? colors.primary : colors.backgroundSecondary,
                  borderColor: isActive ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onCategoryChange?.(category.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isActive ? colors.textWhite : colors.text,
                    fontWeight: isActive ? '600' : '500',
                  },
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

ServiceCategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
};

export default ServiceCategoryFilter;


