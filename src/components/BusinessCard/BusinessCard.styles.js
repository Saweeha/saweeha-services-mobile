import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width for horizontal scroll

const createBusinessCardStyles = (colors) => StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    ...SIZES.shadow.medium,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
    borderRadius: SIZES.radius.lg,
  },
  ratingContainer: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius.sm,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.sm,
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


