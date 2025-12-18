import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';
import { SIZES } from '../../constants/sizes';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
    position: 'relative',
    overflow: 'visible',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    height: 64,
    paddingBottom: SPACING.xs,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  backButtonContainer: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: SIZES.radius.md,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...SIZES.shadow.small,
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
    marginRight: SPACING.sm,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  rightContainer: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  dividerContainer: {
    paddingHorizontal: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    opacity: 0.3,
  },
});
