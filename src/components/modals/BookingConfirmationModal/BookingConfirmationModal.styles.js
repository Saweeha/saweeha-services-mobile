import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createBookingConfirmationModalStyles = (colors) => StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    animatedContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContentWrapper: {
        width: '85%',
        maxWidth: 400,
    },
    modalContent: {
        width: '100%',
        borderRadius: SIZES.radius.lg,
        overflow: 'hidden',
        alignItems: 'center',
        padding: SPACING.lg,
        ...SIZES.shadow.large,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: SPACING.xs,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    detailsContainer: {
        width: '100%',
        borderRadius: SIZES.radius.md,
        padding: SPACING.md,
        marginBottom: SPACING.lg,
        gap: SPACING.md,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.md,
    },
    detailContent: {
        flex: 1,
        gap: SPACING.xs / 2,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    detailSubValue: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: SPACING.xs / 2,
    },
    buttonContainer: {
        width: '100%',
    },
});

export default createBookingConfirmationModalStyles;
