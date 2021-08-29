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
  form: {
    justifyContent: 'center',
    flex: 1
  },
  button: {
    marginTop: 20
  },
  registerContainer: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 5,
    paddingHorizontal: 15
  },
  register: {
    fontSize: 14,
    color: colors.primaryText,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});
