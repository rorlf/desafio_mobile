import React from 'react';

// Components
import { ActivityIndicator, View } from 'react-native';

// Styles
import styles from './styles';
import colors from 'shared/styles/colors';

export default function LoadingScreen() {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={colors.primaryText} />
    </View>
  );
}
