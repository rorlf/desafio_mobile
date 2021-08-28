import { StyleSheet } from 'react-native';
import colors from 'shared/styles/colors';

export default StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 48
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: colors.secondaryText,
    paddingLeft: 20
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 15,
    paddingTop: 5,
    color: colors.error
  }
});
