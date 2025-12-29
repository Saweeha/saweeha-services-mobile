import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createFloatingContinueButtonStyles = (colors) => StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingHorizontal: SPACING.md,
    },
    wrapper: {
        borderRadius: SPACING.md,
        padding: SPACING.xs,
    },
    shadowContainer: {
        ...SIZES.shadow.large,
    },
    button: {
        width: '100%',
    },
});

export default createFloatingContinueButtonStyles;
