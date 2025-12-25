import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const InfoCard = React.memo(({ icon, title, content }) => {
  const { colors } = useTheme();

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default InfoCard;

