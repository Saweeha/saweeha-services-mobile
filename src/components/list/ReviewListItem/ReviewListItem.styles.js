import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createReviewListItemStyles = (colors) => StyleSheet.create({
    container: {
        borderRadius: SIZES.radius.md,
        padding: SPACING.md,
        borderWidth: 1,
        gap: SPACING.sm,
        ...SIZES.shadow.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '700',
    },
    userDetails: {
        flex: 1,
        gap: 2,
    },
    userName: {
        fontSize: 15,
        fontWeight: '600',
    },
    service: {
        fontSize: 13,
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        fontWeight: '500',
    },
    rating: {
        flexDirection: 'row',
        gap: 2,
    },
    comment: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: SPACING.xs,
    },
});

export default createReviewListItemStyles;
