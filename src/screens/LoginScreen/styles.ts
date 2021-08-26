import { StyleSheet } from 'react-native';
import colors from 'shared/styles/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 32,
    color: colors.primaryText,
    textAlign: 'center',
    marginTop: 30
  },
  input: {
    marginTop: 20
  },
  content: {
    justifyContent: 'center',
    flex: 1
  }
});
