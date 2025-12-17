import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width * 0.85,
    height: 200,
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SIZES.shadow.medium,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: SIZES.radius.lg,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius.sm,
    marginBottom: SPACING.sm,
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  title: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    opacity: 0.9,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ctaText: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginRight: SPACING.xs,
  },
});

