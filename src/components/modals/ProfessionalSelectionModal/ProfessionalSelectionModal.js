import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../../hooks/useTheme';
import createProfessionalSelectionModalStyles from './ProfessionalSelectionModal.styles';

const ProfessionalSelectionModal = ({
  visible,
  service,
  professionals,
  currentProfessional,
  onClose,
  onSelectProfessional,
}) => {
  const { colors, scheme } = useTheme();
  const styles = useMemo(() => createProfessionalSelectionModalStyles(colors), [colors]);
  const isDark = scheme === 'dark';

  if (!service) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
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
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <View style={styles.headerTitleContainer}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Professional
                </Text>
                <Text style={[styles.serviceTitle, { color: colors.textSecondary }]}>
                  {service.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {professionals.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="person-outline" size={48} color={colors.textLight} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No professionals available for this service
                </Text>
              </View>
            ) : (
              <ScrollView
                style={styles.professionalList}
                showsVerticalScrollIndicator={false}
              >
                {professionals.map((professional) => {
                  const isSelected = currentProfessional?.id === professional.id;
                  return (
                    <TouchableOpacity
                      key={professional.id}
                      style={[
                        styles.professionalItem,
                        {
                          borderBottomColor: colors.border,
                          backgroundColor: isSelected ? colors.primaryLight : 'transparent',
                        },
                      ]}
                      onPress={() => {
                        onSelectProfessional(professional);
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.avatarContainer}>
                        {professional.image ? (
                          <View style={styles.avatar}>
                          </View>
                        ) : (
                          <View
                            style={[
                              styles.avatarPlaceholder,
                              { backgroundColor: colors.primaryLight },
                            ]}
                          >
                            <Ionicons name="person" size={24} color={colors.primary} />
                          </View>
                        )}
                      </View>
                      <View style={styles.professionalInfo}>
                        <Text style={[styles.professionalName, { color: colors.text }]}>
                          {professional.name}
                        </Text>
                        <Text
                          style={[styles.professionalRole, { color: colors.textSecondary }]}
                        >
                          {professional.role}
                        </Text>
                        {professional.experience && (
                          <View style={styles.experienceContainer}>
                            <Ionicons
                              name="star"
                              size={14}
                              color={colors.warning}
                            />
                            <Text
                              style={[
                                styles.experienceText,
                                { color: colors.textSecondary },
                              ]}
                            >
                              {professional.experience} years experience
                            </Text>
                          </View>
                        )}
                      </View>
                      {isSelected ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={colors.primary}
                        />
                      ) : (
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color={colors.textLight}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </BlurView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

ProfessionalSelectionModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
  }),
  professionals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      experience: PropTypes.number,
      specialties: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    })
  ).isRequired,
  currentProfessional: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSelectProfessional: PropTypes.func.isRequired,
};

export default ProfessionalSelectionModal;


