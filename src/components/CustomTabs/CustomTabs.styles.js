import { StyleSheet } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

const createCustomTabsStyles = (colors) => StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabsContainer: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.lg,
  },
  tab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: SPACING.sm,
  },
  tabActive: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  tabTextActive: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
});

export default createCustomTabsStyles;

