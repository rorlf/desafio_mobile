import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from 'navigators/routes';
import LoginScreen from 'screens/LoginScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false
      }}>
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
}
