import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createServiceCategoryFilterStyles = (colors) => StyleSheet.create({
    container: {

    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    categoryChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: SIZES.radius.round,
        borderWidth: 1,
        marginRight: SPACING.sm,
    },
    categoryText: {
        fontSize: 14,
    },
});

export default createServiceCategoryFilterStyles;
