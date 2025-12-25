import { StyleSheet } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { SIZES } from '../../../constants/sizes';
import { TYPOGRAPHY } from '../../../constants/typography';

const createSearchBarStyles = (colors, isDark = false) => StyleSheet.create({
  searchContainer: {
    marginTop: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: SIZES.radius.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    ...SIZES.shadow.small,
  },
  searchBarFocused: {
    borderColor: isDark ? colors.textWhite : colors.primary,
    backgroundColor: isDark ? colors.backgroundLight : colors.purple50,
    ...SIZES.shadow.medium,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: colors.text,
    paddingVertical: 0,
  },
});

export default createSearchBarStyles;


