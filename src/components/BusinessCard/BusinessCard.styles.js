import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width for horizontal scroll

const createBusinessCardStyles = (colors) => StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.backgroundLight,
    borderRadius: SIZES.radius.md,
    overflow: 'hidden',
    ...SIZES.shadow.small,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: colors.text,
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: colors.textLight,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: colors.text,
    marginLeft: SPACING.xs,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: colors.textLight,
    marginLeft: SPACING.xs,
  },
});

export default createBusinessCardStyles;


