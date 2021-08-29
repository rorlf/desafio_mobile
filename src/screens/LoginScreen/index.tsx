import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigators/AppNavigator/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import analytics from '@react-native-firebase/analytics';

// Components
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import { Text, TouchableOpacity, View } from 'react-native';

// Services
import { login } from 'services/AuthenticationService';

// Styles
import styles from './styles';

interface FormData {
  email: string;
  password: string;
}

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const form = useForm<FormData>();
  const { handleSubmit } = form;
  const passwordInputRef = useRef();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    await login(formData.email, formData.password);
    await analytics().logEvent('loginInApp', {
      email: formData.email,
      method: 'email',
      date: new Date().toISOString()
    });
    setIsLoading(false);
  }

  function onPressRegister() {
    navigation.navigate('RegisterScreen');
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tela Login</Text>
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
          label="Entrar"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          showLoadingIndicator={isLoading}
        />
        <TouchableOpacity
          style={styles.registerContainer}
          onPress={onPressRegister}>
          <Text style={styles.register}>Criar Contar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
