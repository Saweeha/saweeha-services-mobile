import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../hooks/useTheme';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

const BusinessInfo = React.memo(({ name, category, rating, branches = [] }) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const [branchModalVisible, setBranchModalVisible] = useState(false);

  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color={colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(ratingValue);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color={colors.textLight}
        />
      );
    }

    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {name || 'Business Name'}
          </Text>
          {category && (
            <Text style={[styles.category, { color: colors.textSecondary }]}>
              {category}
            </Text>
          )}
        </View>

        <View style={styles.ratingSection}>
          <View style={styles.starsContainer}>{renderStars(rating || 0)}</View>
          <Text style={[styles.ratingText, { color: colors.text }]}>
            {rating?.toFixed(1) || '0.0'}
          </Text>
        </View>
      </View>

      {branches && branches.length > 0 && (
        <TouchableOpacity
          style={[
            styles.branchButton,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setBranchModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={18} color={colors.primary} />
          <View style={styles.branchInfo}>
            <Text style={[styles.branchLabel, { color: colors.textLight }]}>
              Branch
            </Text>
            <Text
              style={[styles.branchName, { color: colors.text }]}
              numberOfLines={1}
            >
              {branches[0]?.name || 'Select Branch'}
            </Text>
          </View>
          {branches.length > 1 && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </TouchableOpacity>
      )}

      {/* Branch Selection Modal */}
      {branches.length > 1 && (
        <Modal
          visible={branchModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setBranchModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setBranchModalVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.modalContentWrapper}
            >
              <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: colors.text }]}>
                    Select Branch
                  </Text>
                  <TouchableOpacity
                    onPress={() => setBranchModalVisible(false)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.branchList}
                  showsVerticalScrollIndicator={false}
                >
                  {branches.map((branch, index) => (
                    <TouchableOpacity
                      key={branch.id || index}
                      style={[
                        styles.branchItem,
                        { borderBottomColor: colors.border },
                      ]}
                      onPress={() => setBranchModalVisible(false)}
                    >
                      <Ionicons name="location" size={20} color={colors.primary} />
                      <View style={styles.branchItemInfo}>
                        <Text style={[styles.branchItemName, { color: colors.text }]}>
                          {branch.name}
                        </Text>
                        {branch.address && (
                          <Text
                            style={[styles.branchItemAddress, { color: colors.textSecondary }]}
                          >
                            {branch.address}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </BlurView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
});

BusinessInfo.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  rating: PropTypes.number,
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      address: PropTypes.string,
      phone: PropTypes.string,
    })
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.xs / 2,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  ratingSection: {
    alignItems: 'flex-end',
    gap: SPACING.xs / 2,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  branchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  branchInfo: {
    flex: 1,
    gap: 2,
  },
  branchLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  branchName: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentWrapper: {
    width: '85%',
    maxHeight: '70%',
  },
  modalContent: {
    width: '100%',
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    ...SIZES.shadow.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  branchList: {
    maxHeight: 400,
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    gap: SPACING.md,
  },
  branchItemInfo: {
    flex: 1,
    gap: SPACING.xs / 2,
  },
  branchItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  branchItemAddress: {
    fontSize: 14,
  },
});

export default BusinessInfo;

