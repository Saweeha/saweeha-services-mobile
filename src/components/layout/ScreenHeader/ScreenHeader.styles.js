import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';

const createScreenHeaderStyles = (colors) => StyleSheet.create({
    header: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY.fontSize.xxxl,
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        marginBottom: SPACING.xs,
    },
    headerSubtitle: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },
});

export default createScreenHeaderStyles;
