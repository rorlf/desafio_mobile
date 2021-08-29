import auth from '@react-native-firebase/auth';
import { showError } from 'services/ToastService';

export async function login(email: string, password: string) {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    handleAuthErrors(error, 'Erro ao logar');
  }
}

export async function register(email: string, password: string) {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    handleAuthErrors(error, 'Erro ao criar conta');
  }
}

function handleAuthErrors(error: any, defaultMesage: string) {
  if (error.code === 'auth/email-already-in-use') {
    showError('Email já está em uso');
    return;
  }

  if (error.code === 'auth/invalid-email') {
    showError('Email Inválido');
    return;
  }

  showError(defaultMesage);
}