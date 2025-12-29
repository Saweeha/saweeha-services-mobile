export const LIGHT_COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  primaryLighter: '#A5B4FC',

  secondary: '#8B5CF6',
  secondaryDark: '#7C3AED',
  secondaryLight: '#A78BFA',

  accent: '#A855F7',
  accentDark: '#9333EA',
  accentLight: '#C084FC',

  background: '#FAF5FF',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#1E1B4B',
  backgroundSecondary: '#F3F4F6',

  text: '#1F2937',
  textSecondary: '#4B5563',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',

  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#6B7280',
  borderPurple: '#E9D5FF',

  error: '#EF4444',
  errorLight: '#FEE2E2',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#6366F1',
  infoLight: '#E0E7FF',

  glassBackground: 'rgba(255, 255, 255, 0.75)',
  glassBorder: 'rgba(139, 92, 246, 0.2)',
  glassBackgroundDark: 'rgba(99, 102, 241, 0.15)',

  gradientStart: '#6366F1',
  gradientEnd: '#8B5CF6',
  gradientSecondary: '#A855F7',
  gradientTertiary: '#EC4899',

  category1: '#EC4899',
  category2: '#F59E0B',
  category3: '#10B981',
  category4: '#3B82F6',
  category5: '#8B5CF6',
  category6: '#EF4444',

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
  primary: '#818CF8',
  primaryDark: '#6366F1',
  primaryLight: '#A5B4FC',
  primaryLighter: '#C7D2FE',

  secondary: '#A855F7',
  secondaryDark: '#7E22CE',
  secondaryLight: '#C084FC',

  accent: '#C084FC',
  accentDark: '#A855F7',
  accentLight: '#E9D5FF',

  background: '#020617',
  backgroundLight: '#020617',
  backgroundDark: '#020617',
  backgroundSecondary: '#111827',

  text: '#F9FAFB',
  textSecondary: '#CBD5F5',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',

  border: '#1F2937',
  borderLight: '#111827',
  borderDark: '#4B5563',
  borderPurple: '#4C1D95',

  error: '#F87171',
  errorLight: '#7F1D1D',
  success: '#34D399',
  successLight: '#064E3B',
  warning: '#FBBF24',
  warningLight: '#78350F',
  info: '#818CF8',
  infoLight: '#1E293B',

  glassBackground: 'rgba(15, 23, 42, 0.85)',
  glassBorder: 'rgba(129, 140, 248, 0.4)',
  glassBackgroundDark: 'rgba(15, 23, 42, 0.9)',

  gradientStart: '#4F46E5',
  gradientEnd: '#7C3AED',
  gradientSecondary: '#A855F7',
  gradientTertiary: '#EC4899',

  category1: '#FB7185',
  category2: '#FACC15',
  category3: '#4ADE80',
  category4: '#60A5FA',
  category5: '#A855F7',
  category6: '#F97373',

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

export const COLORS = LIGHT_COLORS;

