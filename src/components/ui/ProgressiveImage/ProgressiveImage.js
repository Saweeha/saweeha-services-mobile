import React, { useState } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const ProgressiveImage = ({ thumbnailSource, source, style, ...props }) => {
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8',
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

export default ProgressiveImage;
