import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createTeamListItemStyles = (colors) => StyleSheet.create({
    container: {
        borderRadius: SIZES.radius.md,
        padding: SPACING.md,
        borderWidth: 1,
        gap: SPACING.md,
        ...SIZES.shadow.small,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 1,
        gap: SPACING.xs / 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    role: {
        fontSize: 14,
        fontWeight: '500',
    },
    experience: {
        alignItems: 'center',
        gap: 2,
    },
    experienceValue: {
        fontSize: 20,
        fontWeight: '700',
    },
    experienceLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    specialties: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
    },
    specialtyTag: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: SIZES.radius.sm,
        borderWidth: 1,
    },
    specialtyText: {
        fontSize: 12,
        fontWeight: '500',
    },
});

export default createTeamListItemStyles;
