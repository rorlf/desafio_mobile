import { StyleSheet } from 'react-native';
import colors from 'shared/styles/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 26,
    color: colors.primaryText,
    textAlign: 'center',
    marginTop: 20
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center',
    marginTop: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  button: {
    margin: 10,
    marginHorizontal: 20
  },
  needPermissionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  needPermission: {
    fontSize: 16,
    color: colors.primaryText,
    textAlign: 'center'
  },
  tryAgainButton: {
    margin: 20
  }
});
