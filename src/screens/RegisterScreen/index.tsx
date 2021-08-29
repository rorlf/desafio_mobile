import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators/AppNavigator/types';
import { useForm } from 'react-hook-form';

// Components
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import { Text, TouchableOpacity, View } from 'react-native';

// Services
import { register } from 'services/AuthenticationService';

// Styles
import styles from './styles';

interface FormData {
  email: string;
  password: string;
}

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RegisterScreen'
>;

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const form = useForm<FormData>();
  const { handleSubmit } = form;
  const passwordInputRef = useRef();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    await register(formData.email, formData.password);
    setIsLoading(false);
  }

  function onPressLogin() {
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tela Registro</Text>
      <View style={styles.form}>
        <Input
          form={form}
          formKey="email"
          placeholder="Email"
          nextInputRef={passwordInputRef}
          required
        />
        <Input
          form={form}
          formKey="password"
          placeholder="Senha"
          style={styles.input}
          ref={passwordInputRef}
          isSecureText
          required
        />
        <Button
          label="Registrar"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          showLoadingIndicator={isLoading}
        />
        <TouchableOpacity style={styles.loginContainer} onPress={onPressLogin}>
          <Text style={styles.login}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
