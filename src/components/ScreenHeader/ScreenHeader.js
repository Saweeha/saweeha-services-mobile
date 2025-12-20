import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { useTheme } from '../../hooks/useTheme';

const ScreenHeader = React.memo(({ title, subtitle, count, countLabel }) => {
  const { colors } = useTheme();

  const getSubtitleText = () => {
    if (subtitle) {
      return subtitle;
    }
    if (count !== undefined && count !== null) {
      const label = countLabel || 'item';
      const pluralLabel = countLabel ? `${countLabel}s` : 'items';
      return `${count} ${count === 1 ? label : pluralLabel}`;
    }
    return null;
  };

  const subtitleText = getSubtitleText();

  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
        {subtitleText && (
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {subtitleText}
          </Text>
        )}
      </View>
    </View>
  );
});

ScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  count: PropTypes.number,
  countLabel: PropTypes.string,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
});

export default ScreenHeader;

