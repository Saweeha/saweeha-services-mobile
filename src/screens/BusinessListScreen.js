import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import BusinessCard from '../components/cards/BusinessCard/BusinessCard';

import { businessService } from '../services/businessService';
import { useTheme } from '../hooks/useTheme';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';

const BusinessListScreen = () => {
    const navigation = useNavigation();
    const { colors, scheme } = useTheme();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchBusinesses();
    }, []);

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const fetchBusinesses = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await businessService.getAllBusinesses();
            if (response && response.success && Array.isArray(response.data)) {
                setBusinesses(response.data);
            } else {
                setBusinesses([]);
            }
        } catch (err) {
            console.error('Error fetching businesses:', err);
            setError('Failed to load businesses. Please try again.');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    const renderBusiness = ({ item }) => {
        const firstBranch = item?.branches?.[0];
        const firstImageObj = firstBranch?.images?.[0];

        const displayImage = firstImageObj || item.image;

        return (
            <View style={styles.cardWrapper}>
                <BusinessCard
                    name={item?.name || 'Unknown Business'}
                    category={item?.category || 'General'}
                    rating={item?.average_rating || 0}
                    distance={firstBranch?.address ? firstBranch.address.split(',')[0] : 'Distance N/A'}
                    image={displayImage}
                    onPress={() => navigation.navigate('Business', { business: item })}
                    cardWidth={Dimensions.get('window').width - SPACING.md * 2}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom', 'left', 'right']}>
            {isLoading && !refreshing ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                    <TouchableOpacity style={[styles.retryButton, { backgroundColor: colors.primary }]} onPress={fetchBusinesses}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={businesses}
                    renderItem={renderBusiness}
                    keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.text}
                            colors={[colors.primary]}
                            progressBackgroundColor={scheme === 'dark' ? '#334155' : '#FFFFFF'}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No businesses found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    listContent: {
        padding: SPACING.md,
    },
    cardWrapper: {
        marginBottom: SPACING.md,
    },
    errorText: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    retryButton: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: 8,
    },
    retryText: {
        color: '#FFFFFF',
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
    },
    emptyText: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
    },
});

export default BusinessListScreen;
