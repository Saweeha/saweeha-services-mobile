import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { SPACING } from '../constants/spacing';
import { TYPOGRAPHY } from '../constants/typography';
import { useTheme } from '../hooks/useTheme';
import { useAuthGuard } from '../hooks/useAuthGuard';
import AuthTextInput from '../components/auth/AuthTextInput/AuthTextInput';
import { SIZES } from '../constants/sizes';
import { updateUserProfile, clearError } from '../store/authSlice';

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  useAuthGuard('EditProfile');

  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [avatarUri, setAvatarUri] = useState(user?.profile_picture_url ?? null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(user?.date_of_birth ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Synchronize local state with user object when it changes (e.g. after checkAuthStatus)
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAvatarUri(user.profile_picture_url || null);
      setDateOfBirth(user.date_of_birth || '');
      setGender(user.gender || '');
    }
  }, [user]);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = useCallback(async () => {
    if (!name.trim()) {
      Alert.alert('Missing Info', 'Please enter your name.');
      return;
    }

    const userData = {
      name,
      email,
      phone,
      date_of_birth: dateOfBirth,
      gender,
    };

    if (selectedImage) {
      userData.image = {
        uri: selectedImage.uri,
        fileName: selectedImage.fileName || 'profile.jpg',
        mimeType: selectedImage.mimeType || 'image/jpeg',
      };
    }

    try {
      const resultAction = await dispatch(updateUserProfile({ id: user.id, userData }));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        Alert.alert('Profile updated', 'Your profile details have been saved.');
        navigation.goBack();
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  }, [name, email, phone, dateOfBirth, gender, selectedImage, user?.id, dispatch, navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.avatarSection}>
        <View style={[styles.avatar, { backgroundColor: colors.overlay, overflow: 'hidden' }]}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={48} color={colors.textSecondary} />
          )}
        </View>
        <TouchableOpacity
          style={[styles.changePhotoButton, { borderColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={handlePickImage}
          disabled={loading}
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
          editable={!loading}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <AuthTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail-outline"
          editable={!loading}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Phone number</Text>
        <AuthTextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          icon="call-outline"
          editable={!loading}
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
            // For now just manually setting for demo or use a prompt
            Alert.alert('Date of Birth', 'Date picker will be integrated here.', [
              { text: 'Set Tomorrow', onPress: () => setDateOfBirth('2024-01-01') },
              { text: 'Cancel', style: 'cancel' }
            ]);
          }}
          disabled={loading}
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
                disabled={loading}
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
          style={[
            styles.saveButton,
            { backgroundColor: colors.primary },
            loading && { opacity: 0.7 }
          ]}
          activeOpacity={0.85}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.textWhite} />
          ) : (
            <Text style={[styles.saveButtonText, { color: colors.textWhite }]}>Save changes</Text>
          )}
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
  avatarImage: {
    width: '100%',
    height: '100%',
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


