import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { SIZES } from '../constants/sizes';
import { useTheme } from '../hooks/useTheme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQScreen = () => {
  const { colors } = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I book a service?',
      answer:
        'Browse businesses on the home screen, choose a service, select a date and time, and confirm your booking.',
    },
    {
      id: '2',
      question: 'Can I cancel or reschedule a booking?',
      answer:
        'Yes, you can manage your upcoming bookings from the Bookings tab. Cancellation and reschedule options depend on the business policy.',
    },
    {
      id: '3',
      question: 'How do I contact the business?',
      answer:
        'Open the business details page from your booking or search results. You’ll find contact options such as phone number, address, and directions.',
    },
    {
      id: '4',
      question: 'Why do I need an account?',
      answer:
        'An account lets you securely manage your bookings, save favorites, and receive important updates about your appointments.',
    },
  ];

  const toggleItem = useCallback((id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['bottom']}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {faqs.map((item) => {
          const expanded = expandedId === item.id;

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.backgroundLight,
                  borderColor: colors.border,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.header}
                activeOpacity={0.8}
                onPress={() => toggleItem(item.id)}
              >
                <Text style={[styles.question, { color: colors.text }]}>{item.question}</Text>
                <Ionicons
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              {expanded && (
                <View style={styles.body}>
                  <Text style={[styles.answer, { color: colors.textSecondary }]}>
                    {item.answer}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    gap: SPACING.xs,
  },
  card: {
    borderRadius: SIZES.radius.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    ...SIZES.shadow.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  question: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginRight: SPACING.sm,
  },
  body: {
    paddingBottom: SPACING.sm,
  },
  answer: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: 20,
  },
});

export default FAQScreen;


