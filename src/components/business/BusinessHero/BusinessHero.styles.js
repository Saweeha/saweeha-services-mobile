import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../../constants/spacing';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = width * 0.7;

const createBusinessHeroStyles = (colors) => StyleSheet.create({
    container: {
        height: HERO_HEIGHT,
        width: '100%',
        position: 'relative',
    },
    imageContainer: {
        width,
        height: HERO_HEIGHT,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    favoriteButtonContainer: {
        position: 'absolute',
        top: SPACING.md,
        right: SPACING.md,
        zIndex: 10,
    },
    favoriteButton: {
        zIndex: 11,
    },
    favoriteButtonBlur: {
        borderRadius: 20,
        overflow: 'hidden',
        padding: SPACING.sm,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: SPACING.sm,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    paginationBlur: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    paginationDotActive: {
        width: 24,
        height: 6,
        borderRadius: 3,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
    },
    modalHeader: {
        position: 'absolute',
        top: SPACING.xxxl,
        left: 0,
        right: 0,
        paddingHorizontal: SPACING.md,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeButton: {
        zIndex: 11,
    },
    closeButtonBlur: {
        borderRadius: 20,
        overflow: 'hidden',
        padding: SPACING.sm,
    },
    expandedScrollView: {
        flex: 1,
    },
    expandedScrollContent: {
        alignItems: 'center',
    },
    zoomableContainer: {
        width,
        height,
    },
    zoomableContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedImage: {
        width: width,
        height: height,
    },
    expandedPaginationContainer: {
        position: 'absolute',
        bottom: SPACING.md,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default createBusinessHeroStyles;
