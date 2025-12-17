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
  scrollView: {
    marginHorizontal: -SPACING.md,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    marginHorizontal: SPACING.md,
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    ...SIZES.shadow.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius.lg,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.purple100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});

