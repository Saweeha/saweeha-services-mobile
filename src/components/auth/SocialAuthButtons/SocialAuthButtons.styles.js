import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';
import { TYPOGRAPHY } from '../../../constants/typography';

const styles = StyleSheet.create({
  socialSection: {
    marginTop: SPACING.lg,
  },
  socialDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  socialDivider: {
    flex: 1,
    height: 1,
    borderRadius: 1,
    opacity: 0.5,
  },
  socialDividerText: {
    marginHorizontal: SPACING.sm,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  socialButtonsRow: {
    gap: SPACING.sm,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
  },
  socialButtonIcon: {
    marginRight: SPACING.sm,
  },
  socialButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
});

export default styles;


