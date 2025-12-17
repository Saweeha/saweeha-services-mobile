import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width for horizontal scroll

export default StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radius.md,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SIZES.shadow.small,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.border,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.textLight,
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
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: COLORS.textLight,
    marginLeft: SPACING.xs,
  },
});

