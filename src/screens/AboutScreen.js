import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';

const AboutScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.section}>
        <Text style={[styles.title, { color: colors.text }]}>Saweeha Services</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover, book, and manage appointments with top-rated local businesses.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.heading, { color: colors.text }]}>Our mission</Text>
        <Text style={[styles.body, { color: colors.textSecondary }]}>
          We aim to make booking services effortless for customers while helping businesses
          manage their schedules and grow their client base.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  heading: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.xs,
  },
  body: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: 20,
  },
  meta: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
});

export default AboutScreen;


