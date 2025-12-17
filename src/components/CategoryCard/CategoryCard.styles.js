import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';
import { TYPOGRAPHY } from '../../constants/typography';

const { width } = Dimensions.get('window');
const cardWidth = (width - SPACING.md * 3) / 2; // 2 columns with spacing

export default StyleSheet.create({
  container: {
    width: cardWidth,
    height: 100,
    borderRadius: SIZES.radius.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SIZES.shadow.small,
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  name: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    flex: 1,
  },
});

