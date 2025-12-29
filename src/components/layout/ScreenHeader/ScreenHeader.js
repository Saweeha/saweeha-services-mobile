import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import createScreenHeaderStyles from './ScreenHeader.styles';

const ScreenHeader = React.memo(({ title, subtitle, count, countLabel }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createScreenHeaderStyles(colors), [colors]);

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

export default ScreenHeader;


