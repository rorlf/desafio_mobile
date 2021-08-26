import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import colors from 'shared/styles/colors';
import styles from './styles';
import { Controller, UseFormReturn, get } from 'react-hook-form';
import { useState } from 'react';

interface Props extends TextInputProps {
  style?: ViewStyle;
  inputStyle?: TextStyle;
  placeholder?: string;
  required?: boolean;
  formKey: string;
  form: UseFormReturn<any>;
  nextInputRef?: any;
  isSecureText?: boolean;
}

function Input(props: Props, ref: ForwardedRef<any>) {
  const {
    style,
    placeholder,
    required,
    formKey,
    form,
    nextInputRef,
    isSecureText,
    ...textInputProps
  } = props;
  const {
    control,
    formState: { errors }
  } = form;

  useImperativeHandle(ref, () => ({
    focus() {
      focus();
    }
  }));

  const errorMessage = get(errors, formKey)?.message;

  const [isTextVisible, setIsTextVisible] = useState(
    isSecureText ? false : true
  );

  const textInputRef = useRef<any>();

  const containerStyle = { ...styles.container, ...style };
  const contentStyle = {
    ...styles.content,
    borderColor: errorMessage ? colors.error : colors.secondaryText
  };

  const rules = required ? { required: 'Esse campo é obrigatório' } : undefined;

  function onSubmit() {
    focusNextInput();
  }

  function focus() {
    try {
      textInputRef?.current?.focus();
    } catch (ex) {}
  }

  function focusNextInput() {
    try {
      nextInputRef?.current?.focus();
    } catch (ex) {}
  }

  function toggleVisibility() {
    setIsTextVisible(prevIsTextVisible => !prevIsTextVisible);
  }

  return (
    <View style={containerStyle}>
      <View style={contentStyle}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              {...textInputProps}
              ref={textInputRef}
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={colors.secondaryText}
              onSubmitEditing={onSubmit}
              secureTextEntry={!isTextVisible}
            />
          )}
          name={formKey}
          rules={rules}
        />
        {/* {isSecureText && (
          <TouchableOpacity style={styles.icon} onPress={toggleVisibility}>
            <Icon name={isTextVisible ? 'eyeOpen' : 'eyeClose'} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}

export default forwardRef(Input);
