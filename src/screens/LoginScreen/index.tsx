import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Input from 'shared/components/Input';
import styles from './styles';

interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const form = useForm<FormData>();
  const passwordInputRef = useRef();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tela Login</Text>
      <View style={styles.content}>
        <Input
          form={form}
          formKey="email"
          placeholder="Email"
          nextInputRef={passwordInputRef}
        />
        <Input
          form={form}
          formKey="password"
          placeholder="Senha"
          style={styles.input}
          ref={passwordInputRef}
        />
      </View>
    </View>
  );
}
