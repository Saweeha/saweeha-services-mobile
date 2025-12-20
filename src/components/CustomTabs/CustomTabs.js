import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import createStyles from './CustomTabs.styles';

const CustomTabs = React.memo(({ tabs = [], activeTab, onTabChange }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                isActive && [styles.tabActive, { borderBottomColor: colors.primary }],
              ]}
              onPress={() => onTabChange?.(tab.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? colors.primary : colors.textSecondary },
                  isActive && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
};

export default CustomTabs;

