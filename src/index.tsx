import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { enableScreens } from 'react-native-screens';
import AppNavigator from 'navigators/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from 'contexts/Auth';
import { navigationRef, onStateChange } from 'services/NavigationService';
enableScreens();

export default function App() {
  return (
    <AuthProvider>
      <RootSiblingParent>
        <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </RootSiblingParent>
    </AuthProvider>
  );
}
