import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import colors from 'shared/styles/colors';
import styles from './styles';

interface Props extends TextInputProps {
  style?: ViewStyle;
  label: string;
  onPress?: () => void;
  showLoadingIndicator?: boolean;
}

export default function Button(props: Props) {
  const { style, label, onPress, showLoadingIndicator } = props;

  const containerStyle = {
    ...styles.container,
    ...style
  };

  if (onPress) {
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
        {showLoadingIndicator && (
          <ActivityIndicator
            color={colors.primaryText}
            style={styles.loading}
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      {showLoadingIndicator && (
        <ActivityIndicator color={colors.primaryText} style={styles.loading} />
      )}
    </View>
  );
}
