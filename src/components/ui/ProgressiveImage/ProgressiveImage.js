import React, { useState, useMemo } from 'react';
import { View, Animated } from 'react-native';
import createProgressiveImageStyles from './ProgressiveImage.styles';
import { useTheme } from '../../../hooks/useTheme';

const ProgressiveImage = ({ thumbnailSource, source, style, ...props }) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createProgressiveImageStyles(colors), [colors]);
    const [thumbnailAnimated] = useState(new Animated.Value(0));
    const [imageAnimated] = useState(new Animated.Value(0));

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={[styles.container, style]}>
            {thumbnailSource && (
                <Animated.Image
                    {...props}
                    source={thumbnailSource}
                    style={[
                        style,
                        { opacity: thumbnailAnimated },
                    ]}
                    onLoad={handleThumbnailLoad}
                    blurRadius={2}
                />
            )}
            <Animated.Image
                {...props}
                source={source}
                style={[
                    styles.imageOverlay,
                    { opacity: imageAnimated },
                    style,
                ]}
                onLoad={onImageLoad}
            />
        </View>
    );
};

export default ProgressiveImage;

