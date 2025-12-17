import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radius.md,
    padding: SPACING.md,
  },
  default: {
    ...SIZES.shadow.small,
  },
  elevated: {
    ...SIZES.shadow.medium,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SIZES.shadow.small,
  },
});

