import Toast, { ToastOptions } from 'react-native-root-toast';
import colors from 'shared/styles/colors';

export function showError(message: string, options?: ToastOptions) {
  Toast.show(message, {
    backgroundColor: colors.error,
    ...options
  });
}
