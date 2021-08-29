import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Screens
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import LoadingScreen from 'screens/LoadingScreen';
import HomeScreen from 'screens/HomeScreen';

// Context
import { useAuth } from 'contexts/Auth';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isInitializing, isAuthenticated } = useAuth();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}>
      {isAuthenticated ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
