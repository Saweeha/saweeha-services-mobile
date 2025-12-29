import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';
import { SIZES } from '../../../constants/sizes';

const createNotificationItemStyles = (colors) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderRadius: SIZES.radius.lg,
        ...SIZES.shadow.small,
    },
    rowPressed: {
        opacity: 0.7,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    title: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        marginRight: SPACING.xs,
    },
    titleUnread: {
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
    },
    unreadDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
    message: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
        marginBottom: SPACING.xs,
    },
    time: {
        fontSize: TYPOGRAPHY.fontSize.xs,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },
});

export default createNotificationItemStyles;
