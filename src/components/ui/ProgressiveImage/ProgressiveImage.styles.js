import { StyleSheet } from 'react-native';

const createProgressiveImageStyles = (colors) => StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8', // Default background for loading state
        overflow: 'hidden',
    },
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
});

export default createProgressiveImageStyles;
