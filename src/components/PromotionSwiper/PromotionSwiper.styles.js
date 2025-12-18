import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.md * 2;

export default StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  pagerView: {
    width: width,
    height: 180,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  card: {
    width: CARD_WIDTH,
    height: "100%",
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    ...SIZES.shadow.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius.lg,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  paginationBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textWhite,
    opacity: 0.5,
  },
  paginationDotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textWhite,
    opacity: 1,
  },
});

