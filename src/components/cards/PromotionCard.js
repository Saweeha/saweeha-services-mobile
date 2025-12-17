import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const PromotionCard = ({ title, subtitle, discount, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor || COLORS.primary }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.discount}>{discount}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.decorativeCircle} />
        <View style={styles.decorativeCircle2} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    width: 280,
    height: 160,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    zIndex: 2,
  },
  discount: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  decorativeCircle: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    opacity: 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    right: 20,
    bottom: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    opacity: 0.08,
  },
});

export default PromotionCard;

