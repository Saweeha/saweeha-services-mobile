import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../../../constants/spacing';
import { TYPOGRAPHY } from '../../../constants/typography';

const { width } = Dimensions.get('window');
const cardWidth = (width - SPACING.md * 3) / 2; // 2 columns with spacing

const createTeamMemberCardStyles = (colors) => StyleSheet.create({
    container: {
        width: cardWidth,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SPACING.sm,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        gap: SPACING.xs / 2,
        width: '100%',
    },
    name: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontFamily: TYPOGRAPHY.fontFamily.semibold,
        textAlign: 'center',
    },
    role: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        textAlign: 'center',
    },
});

export default createTeamMemberCardStyles;
