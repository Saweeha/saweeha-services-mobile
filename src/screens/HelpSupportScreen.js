import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';

const HelpSupportScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@saweeha.com');
  };

  const handleFaqPress = () => {
    navigation.navigate('FAQ');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.section}>
        <Text style={[styles.title, { color: colors.text }]}>Need help?</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We’re here to support you with bookings, payments, and account issues.
        </Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handleEmailPress}>
          <View style={styles.rowLeft}>
            <Ionicons name="mail-outline" size={22} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.text }]}>Email support</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={handleFaqPress}>
          <View style={styles.rowLeft}>
            <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
            <Text style={[styles.rowLabel, { color: colors.text }]}>View FAQs</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
        </TouchableOpacity>
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
  card: {
    borderRadius: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.md,
  },
  rowLabel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});

export default HelpSupportScreen;


