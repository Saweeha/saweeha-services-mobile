import { StyleSheet } from 'react-native';
import { SPACING } from '../../constants/spacing';
import { SIZES } from '../../constants/sizes';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: SIZES.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SIZES.shadow.small,
  },
});
