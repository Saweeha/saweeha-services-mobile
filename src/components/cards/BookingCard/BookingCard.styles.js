import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';
import { SIZES } from '../../../constants/sizes';

const createBookingCardStyles = (colors) => StyleSheet.create({
    container: {
        borderRadius: SIZES.radius.md,
        borderWidth: 1,
        overflow: 'hidden',
        ...SIZES.shadow.small,
    },
    header: {
        flexDirection: 'row',
        padding: SPACING.md,
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: SIZES.radius.sm,
        marginRight: SPACING.md,
    },
    businessInfo: {
        flex: 1,
    },
    businessName: {
        fontSize: TYPOGRAPHY.fontSize.lg,
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
        marginBottom: SPACING.xs / 2,
    },
    category: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        marginBottom: SPACING.xs,
    },
    dateTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimeText: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        marginLeft: SPACING.xs / 2,
    },
    rightSection: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 70,
    },
    statusBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs / 2,
        borderRadius: SIZES.radius.sm,
    },
    statusText: {
        fontSize: TYPOGRAPHY.fontSize.xs,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
    },
    expandedContent: {
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.md,
        borderTopWidth: 1,
    },
    fullDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: SPACING.sm,
    },
    fullDateText: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },
    servicesContainer: {
        marginBottom: SPACING.md,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.xs,
        borderTopWidth: 1,
    },
    serviceName: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        flex: 1,
    },
    servicePrice: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
    },
    branchContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    branchInfo: {
        flex: 1,
    },
    branchName: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        marginBottom: SPACING.xs / 2,
    },
    branchAddress: {
        fontSize: TYPOGRAPHY.fontSize.xs,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.sm,
        borderRadius: SIZES.radius.sm,
        marginBottom: SPACING.md,
    },
    totalLabel: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },
    totalPrice: {
        fontSize: TYPOGRAPHY.fontSize.lg,
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: SIZES.radius.sm,
        borderWidth: 1,
    },
    actionButtonText: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
    },
});

export default createBookingCardStyles;
