import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';
import { useAuthGuard } from '../hooks/useAuthGuard';
import AuthTextInput from '../components/auth/AuthTextInput/AuthTextInput';
import { SIZES } from '../constants/sizes';

const EditProfileScreen = () => {
  const { colors } = useTheme();
  useAuthGuard('EditProfile');

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [avatarUri, setAvatarUri] = useState(user?.avatarUrl ?? null);
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');

  const handleSave = useCallback(() => {
    // TODO: Connect to API / store update
    Alert.alert('Profile updated', 'Your profile details have been saved.');
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
          {avatarUri ? (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{ flex: 1 }} />
          ) : (
            <Ionicons name="person" size={32} color={colors.primary} />
          )}
        </View>
        <TouchableOpacity
          style={[styles.changePhotoButton, { borderColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={() => {
            // TODO: Integrate image picker
          }}
        >
          <Text style={[styles.changePhotoText, { color: colors.primary }]}>
            Change photo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Full name</Text>
        <AuthTextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          icon="person-outline"
          autoCapitalize="words"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <AuthTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail-outline"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Phone number</Text>
        <AuthTextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          icon="call-outline"
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Date of birth</Text>
        <TouchableOpacity
          style={[
            styles.inlineField,
            {
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => {
            // TODO: Hook to date picker modal
          }}
        >
          <View style={styles.inlineLeft}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text
              style={[
                styles.inlineValue,
                { color: dateOfBirth ? colors.text : colors.textSecondary },
              ]}
            >
              {dateOfBirth || 'Select your date of birth'}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Gender</Text>
        <View style={styles.genderRow}>
          {['male', 'female'].map((value) => {
            const isSelected = gender === value;
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.genderChip,
                  {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected ? colors.primary : colors.background,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setGender(value)}
              >
                <Text
                  style={[
                    styles.genderText,
                    { color: isSelected ? colors.textWhite : colors.text },
                  ]}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.textWhite }]}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  changePhotoButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius.lg,
    borderWidth: 1,
  },
  changePhotoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  form: {
    gap: SPACING.sm,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  inlineField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    minHeight: 52,
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
  },
  inlineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  inlineValue: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  genderChip: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  saveButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
  },
});

export default EditProfileScreen;


