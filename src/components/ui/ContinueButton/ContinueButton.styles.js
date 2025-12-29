import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createContinueButtonStyles = (colors) => StyleSheet.create({
    button: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: SIZES.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...SIZES.shadow.medium,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    badge: {
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        paddingHorizontal: SPACING.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
});

export default createContinueButtonStyles;
