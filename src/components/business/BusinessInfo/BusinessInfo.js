import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../../hooks/useTheme';
import createBusinessInfoStyles from './BusinessInfo.styles';

const BusinessInfo = React.memo(({ name, category, rating, branches = [], selectedBranchId, onBranchSelect }) => {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const styles = useMemo(() => createBusinessInfoStyles(colors), [colors]);
  const [branchModalVisible, setBranchModalVisible] = useState(false);

  // Find the selected branch object
  const selectedBranch = React.useMemo(() => {
    if (!selectedBranchId) return branches[0];
    return branches.find(b => b.id === selectedBranchId) || branches[0];
  }, [branches, selectedBranchId]);

  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue || 0);
    const hasHalfStar = (ratingValue || 0) % 1 !== 0;

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

    const emptyStars = 5 - Math.ceil(ratingValue || 0);
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

  const handleBranchSelect = (branch) => {
    setBranchModalVisible(false);
    if (onBranchSelect) {
      onBranchSelect(branch);
    }
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
          <View style={styles.starsContainer}>{renderStars(rating)}</View>
          <Text style={[styles.ratingText, { color: colors.text }]}>
            {rating ? rating.toFixed(1) : 'Not rated'}
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
              {selectedBranch?.name || 'Select Branch'}
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
                  {branches.map((branch, index) => {
                    const isSelected = branch.id === selectedBranchId;
                    return (
                      <TouchableOpacity
                        key={branch.id || index}
                        style={[
                          styles.branchItem,
                          {
                            borderBottomColor: colors.border,
                            backgroundColor: isSelected ? colors.backgroundSecondary : 'transparent'
                          },
                        ]}
                        onPress={() => handleBranchSelect(branch)}
                      >
                        <Ionicons
                          name={isSelected ? "location" : "location-outline"}
                          size={20}
                          color={isSelected ? colors.primary : colors.textSecondary}
                        />
                        <View style={styles.branchItemInfo}>
                          <View style={styles.branchItemHeader}>
                            <Text style={[
                              styles.branchItemName,
                              { color: isSelected ? colors.primary : colors.text, fontWeight: isSelected ? '700' : '600' }
                            ]}>
                              {branch.name}
                            </Text>
                            <View style={styles.branchItemRating}>
                              <Ionicons name="star" size={12} color={branch.average_rating ? colors.warning : colors.textLight} />
                              <Text style={[styles.branchRatingText, { color: branch.average_rating ? colors.text : colors.textLight }]}>
                                {branch.average_rating ? branch.average_rating.toFixed(1) : 'Not rated'}
                              </Text>
                            </View>
                          </View>
                          {branch.address && (
                            <Text
                              style={[styles.branchItemAddress, { color: colors.textSecondary }]}
                            >
                              {branch.address}
                            </Text>
                          )}
                        </View>
                        {isSelected && (
                          <Ionicons name="checkmark" size={20} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
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

export default BusinessInfo;


