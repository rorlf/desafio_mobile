import React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import { RootStackParamList } from 'navigators/AppNavigator/types';
import crashlytics from '@react-native-firebase/crashlytics';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

let previousRouteName;

export function onStateChange() {
  const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

  if (previousRouteName !== currentRouteName) {
    crashlytics().log('current route => ' + currentRouteName);
  }

  previousRouteName = currentRouteName;
}
