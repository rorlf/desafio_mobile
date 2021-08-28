import { StyleSheet } from 'react-native';
import colors from 'shared/styles/colors';

export default StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 2,
    borderColor: colors.primaryText,
    justifyContent: 'center',
    borderRadius: 20
  },
  label: {
    color: colors.primaryText,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 40
  },
  loading: {
    position: 'absolute',
    right: 10
  }
});
