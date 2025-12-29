import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createDatePickerStyles = (colors) => StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    dateCard: {
        width: 70,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.sm,
        borderRadius: SIZES.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        ...SIZES.shadow.small,
    },
    weekday: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: SPACING.xs / 2,
        textTransform: 'uppercase',
    },
    day: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: SPACING.xs / 2,
    },
    month: {
        fontSize: 12,
        fontWeight: '500',
    },
    todayBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        borderRadius: 8,
    },
    todayText: {
        fontSize: 8,
        fontWeight: '700',
    },
});

export default createDatePickerStyles;
