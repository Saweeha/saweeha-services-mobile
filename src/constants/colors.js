export const LIGHT_COLORS = {
  // Primary colors - Indigo & Purple
  primary: '#6366F1', // Indigo-500
  primaryDark: '#4F46E5', // Indigo-600
  primaryLight: '#818CF8', // Indigo-400
  primaryLighter: '#A5B4FC', // Indigo-300

  // Secondary colors - Purple tones
  secondary: '#8B5CF6', // Purple-500
  secondaryDark: '#7C3AED', // Purple-600
  secondaryLight: '#A78BFA', // Purple-400

  // Accent colors - Vibrant purples
  accent: '#A855F7', // Purple-500
  accentDark: '#9333EA', // Purple-600
  accentLight: '#C084FC', // Purple-400

  // Background colors - Soft purple/indigo tints
  background: '#FAF5FF', // Very light purple tint
  backgroundLight: '#FFFFFF',
  backgroundDark: '#1E1B4B', // Deep indigo
  backgroundSecondary: '#F3F4F6', // Light gray with purple undertone

  // Text colors
  text: '#1F2937', // Almost black with slight cool tone
  textSecondary: '#4B5563', // Medium gray
  textLight: '#9CA3AF', // Light gray
  textWhite: '#FFFFFF',

  // Border colors
  border: '#E5E7EB', // Light gray
  borderLight: '#F3F4F6', // Very light gray
  borderDark: '#6B7280', // Medium gray
  borderPurple: '#E9D5FF', // Light purple border

  // Status colors - Harmonized with purple theme
  error: '#EF4444', // Red-500
  errorLight: '#FEE2E2', // Red-100
  success: '#10B981', // Emerald-500
  successLight: '#D1FAE5', // Emerald-100
  warning: '#F59E0B', // Amber-500
  warningLight: '#FEF3C7', // Amber-100
  info: '#6366F1', // Indigo-500 (matches primary)
  infoLight: '#E0E7FF', // Indigo-100

  // Glass effect colors - Purple tinted
  glassBackground: 'rgba(255, 255, 255, 0.75)',
  glassBorder: 'rgba(139, 92, 246, 0.2)', // Purple with opacity
  glassBackgroundDark: 'rgba(99, 102, 241, 0.15)', // Indigo with opacity

  // Gradient colors - Beautiful purple/indigo gradients
  gradientStart: '#6366F1', // Indigo-500
  gradientEnd: '#8B5CF6', // Purple-500
  gradientSecondary: '#A855F7', // Purple-500
  gradientTertiary: '#EC4899', // Pink-500 for accent gradients

  // Category colors - Vibrant, complementary to purple/indigo
  category1: '#EC4899', // Pink-500 - Beauty Salons
  category2: '#F59E0B', // Amber-500 - Barbers
  category3: '#10B981', // Emerald-500 - Massage/Wellness
  category4: '#3B82F6', // Blue-500 - Nail Salons
  category5: '#8B5CF6', // Purple-500 - Spa & Wellness
  category6: '#EF4444', // Red-500 - Fitness Centers

  // Additional purple/indigo shades for variety
  purple50: '#FAF5FF',
  purple100: '#F3E8FF',
  purple200: '#E9D5FF',
  purple300: '#D8B4FE',
  purple400: '#C084FC',
  purple500: '#A855F7',
  purple600: '#9333EA',
  purple700: '#7E22CE',

  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo200: '#C7D2FE',
  indigo300: '#A5B4FC',
  indigo400: '#818CF8',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',
};

export const DARK_COLORS = {
  // Primary colors - keep brand but slightly dimmed
  primary: '#818CF8', // Indigo-400
  primaryDark: '#6366F1', // Indigo-500
  primaryLight: '#A5B4FC', // Indigo-300
  primaryLighter: '#C7D2FE', // Indigo-200

  // Secondary colors - Purple tones
  secondary: '#A855F7', // Purple-500
  secondaryDark: '#7E22CE', // Purple-700
  secondaryLight: '#C084FC', // Purple-400

  // Accent colors
  accent: '#C084FC',
  accentDark: '#A855F7',
  accentLight: '#E9D5FF',

  // Background colors - dark surfaces
  background: '#020617', // slate-950
  backgroundLight: '#020617', // main app background
  backgroundDark: '#020617',
  backgroundSecondary: '#111827', // slate-900

  // Text colors
  text: '#F9FAFB', // slate-50
  textSecondary: '#CBD5F5',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',

  // Border colors
  border: '#1F2937',
  borderLight: '#111827',
  borderDark: '#4B5563',
  borderPurple: '#4C1D95',

  // Status colors
  error: '#F87171',
  errorLight: '#7F1D1D',
  success: '#34D399',
  successLight: '#064E3B',
  warning: '#FBBF24',
  warningLight: '#78350F',
  info: '#818CF8',
  infoLight: '#1E293B',

  // Glass effect colors - darker overlay
  glassBackground: 'rgba(15, 23, 42, 0.85)',
  glassBorder: 'rgba(129, 140, 248, 0.4)',
  glassBackgroundDark: 'rgba(15, 23, 42, 0.9)',

  // Gradients
  gradientStart: '#4F46E5',
  gradientEnd: '#7C3AED',
  gradientSecondary: '#A855F7',
  gradientTertiary: '#EC4899',

  // Category colors - keep vibrant for contrast
  category1: '#FB7185',
  category2: '#FACC15',
  category3: '#4ADE80',
  category4: '#60A5FA',
  category5: '#A855F7',
  category6: '#F97373',

  // Additional purple/indigo shades for variety
  purple50: '#1E1B4B',
  purple100: '#312E81',
  purple200: '#3730A3',
  purple300: '#4C1D95',
  purple400: '#6D28D9',
  purple500: '#7C3AED',
  purple600: '#8B5CF6',
  purple700: '#A855F7',

  indigo50: '#020617',
  indigo100: '#020617',
  indigo200: '#020617',
  indigo300: '#1E293B',
  indigo400: '#312E81',
  indigo500: '#3730A3',
  indigo600: '#4F46E5',
  indigo700: '#6366F1',
};

export const getColorsForScheme = (scheme) =>
  scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

// Backwards-compatible default export used in non-themed code paths.
// New code should prefer getColorsForScheme or the theme hook.
export const COLORS = LIGHT_COLORS;

