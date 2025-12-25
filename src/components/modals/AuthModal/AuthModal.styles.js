import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';
import { TYPOGRAPHY } from '../../../constants/typography';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderTopLeftRadius: SIZES.radius.xl,
    borderTopRightRadius: SIZES.radius.xl,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    ...SIZES.shadow.large,
  },
  header: {
    paddingBottom: SPACING.lg,
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: SPACING.xs,
    marginRight: SPACING.xxxl,
    lineHeight: TYPOGRAPHY.fontSize.xxxl * 1.2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    marginTop: SPACING.xs,
    lineHeight: TYPOGRAPHY.fontSize.md * 1.5,
  },
  formContainer: {
    flexGrow: 1,
  },
  formContentContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  forgotPasswordText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
  submitButton: {
    paddingVertical: SPACING.md + 2,
    borderRadius: SIZES.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    minHeight: 52,
    ...SIZES.shadow.medium,
  },
  submitButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    letterSpacing: 0.3,
  },
  socialSection: {
    marginTop: SPACING.lg,
  },
  socialDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  socialDivider: {
    flex: 1,
    height: 1,
    borderRadius: 1,
    opacity: 0.2,
  },
  socialDividerText: {
    marginHorizontal: SPACING.md,
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
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
    minHeight: 52,
  },
  socialButtonIcon: {
    marginRight: SPACING.sm,
  },
  socialButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  closeTextButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  closeText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  secondaryActionButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.xs,
  },
  secondaryActionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
});

export default styles;


