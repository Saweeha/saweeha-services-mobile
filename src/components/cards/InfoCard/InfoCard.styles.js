import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';

const createInfoCardStyles = (colors) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        gap: SPACING.xs / 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
    },
});

export default createInfoCardStyles;
