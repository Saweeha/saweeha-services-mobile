import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createServiceListItemStyles = (colors) => StyleSheet.create({
    container: {
        borderRadius: SIZES.radius.md,
        ...SIZES.shadow.small,
    },
    content: {
        padding: SPACING.md,
        gap: SPACING.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: SPACING.sm,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.xs,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    metaText: {
        fontSize: 14,
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
    },
    professionalBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs / 2,
        borderRadius: SIZES.radius.sm,
        gap: SPACING.xs / 2,
        marginTop: SPACING.xs / 2,
    },
    professionalText: {
        fontSize: 12,
        fontWeight: '600',
        maxWidth: 150,
    },
});

export default createServiceListItemStyles;
