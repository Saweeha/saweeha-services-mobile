import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import createInfoCardStyles from './InfoCard.styles';

const InfoCard = React.memo(({ icon, title, content }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createInfoCardStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
        <Ionicons name={icon} size={24} color={colors.textWhite} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.text, { color: colors.textSecondary }]}>{content}</Text>
      </View>
    </View>
  );
});

InfoCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default InfoCard;


