import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createProfessionalSelectionModalStyles = (colors) => StyleSheet.create({
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
        alignItems: 'flex-start',
        padding: SPACING.md,
        borderBottomWidth: 1,
    },
    headerTitleContainer: {
        flex: 1,
        marginRight: SPACING.md,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: SPACING.xs / 2,
    },
    serviceTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    professionalList: {
        maxHeight: 400,
    },
    professionalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        gap: SPACING.md,
        borderRadius: SIZES.radius.sm,
        marginHorizontal: SPACING.xs,
        marginVertical: SPACING.xs / 2,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    professionalInfo: {
        flex: 1,
        gap: SPACING.xs / 2,
    },
    professionalName: {
        fontSize: 16,
        fontWeight: '600',
    },
    professionalRole: {
        fontSize: 14,
        fontWeight: '500',
    },
    experienceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs / 2,
        marginTop: SPACING.xs / 2,
    },
    experienceText: {
        fontSize: 12,
    },
    emptyContainer: {
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.md,
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default createProfessionalSelectionModalStyles;
