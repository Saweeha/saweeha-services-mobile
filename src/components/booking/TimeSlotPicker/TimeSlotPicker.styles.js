import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createTimeSlotPickerStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    timeSlot: {
        flex: 1,
        minWidth: '30%',
        maxWidth: '48%',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.sm,
        borderRadius: SIZES.radius.md,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        ...SIZES.shadow.small,
    },
    timeText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default createTimeSlotPickerStyles;
