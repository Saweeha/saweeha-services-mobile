import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createBusinessInfoStyles = (colors) => StyleSheet.create({
    container: {
        padding: SPACING.md,
        gap: SPACING.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleSection: {
        flex: 1,
        marginRight: SPACING.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: SPACING.xs / 2,
    },
    category: {
        fontSize: 14,
        fontWeight: '500',
    },
    ratingSection: {
        alignItems: 'flex-end',
        gap: SPACING.xs / 2,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
    },
    branchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: SIZES.radius.md,
        borderWidth: 1,
        gap: SPACING.sm,
    },
    branchInfo: {
        flex: 1,
        gap: 2,
    },
    branchLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    branchName: {
        fontSize: 14,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentWrapper: {
        width: '85%',
        maxHeight: '70%',
    },
    modalContent: {
        width: '100%',
        borderRadius: SIZES.radius.lg,
        overflow: 'hidden',
        ...SIZES.shadow.large,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    branchList: {
        maxHeight: 400,
    },
    branchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        gap: SPACING.md,
    },
    branchItemInfo: {
        flex: 1,
        gap: SPACING.xs / 2,
    },
    branchItemName: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    branchItemAddress: {
        fontSize: 14,
    },
    branchItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    branchItemRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    branchRatingText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default createBusinessInfoStyles;
