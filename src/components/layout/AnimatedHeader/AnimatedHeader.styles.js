import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';

const createAnimatedHeaderStyles = (colors) => StyleSheet.create({
    headerContainer: {
        flex: 1,
    },
    blurView: {
        overflow: 'hidden',
    },
    floatingBackButtonContainer: {
        position: 'absolute',
        left: SPACING.lg,
        zIndex: 1000,
    },
    floatingBackButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingBackButtonInner: {
        width: 44,
        height: 44,
        borderRadius: SIZES.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...SIZES.shadow.small,
    },
});

export default createAnimatedHeaderStyles;
