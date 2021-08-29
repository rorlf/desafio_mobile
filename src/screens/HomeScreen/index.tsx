import React, { useEffect, useMemo, useState } from 'react';
import Geolocation, {
  GeoError,
  GeoPosition
} from 'react-native-geolocation-service';
import { constants, getData, storeData } from 'data/Storage';
import { Position, PositionToShowOption } from './types';
import crashlytics from '@react-native-firebase/crashlytics';

// Components
import { View, PermissionsAndroid, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingScreen from 'screens/LoadingScreen';

// Styles
import styles from './styles';
import Button from 'shared/components/Button';

// Services
import { logout } from 'services/AuthenticationService';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [currrentPosition, setCurrrentPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
    speed: null
  });
  const [lastAccessPosition, setLastAccessPosition] = useState<Position>();

  const [positionToShowOption, setPositionToShowOption] =
    useState<PositionToShowOption>('current');

  const positionToShow = useMemo(
    () =>
      lastAccessPosition && positionToShowOption === 'lastAccess'
        ? lastAccessPosition
        : currrentPosition,
    [positionToShowOption, lastAccessPosition, currrentPosition]
  );

  const markerIcon = useMemo(
    () =>
      positionToShow.speed && positionToShow.speed > 4
        ? 'directions-car'
        : 'directions-walk',
    [positionToShow]
  );

  useEffect(() => {
    requestPermission();
    obtainLastAccessPosition();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      const watchId = Geolocation.watchPosition(
        onSuccessWatchPosition,
        onErrorWatchPosition,
        { enableHighAccuracy: true, interval: 100, distanceFilter: 10 }
      );
      return () => Geolocation.clearWatch(watchId);
    }
  }, [hasPermission]);

  async function requestPermission() {
    setIsLoading(true);
    const coarseLocationPermission = await PermissionsAndroid.request(
      'android.permission.ACCESS_COARSE_LOCATION'
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      'android.permission.ACCESS_FINE_LOCATION'
    );
    if (
      coarseLocationPermission === 'granted' &&
      fineLocationPermission === 'granted'
    ) {
      setHasPermission(true);
    }
    setIsLoading(false);
  }

  async function obtainLastAccessPosition() {
    const lastAccessPosition = await getData(constants.LAST_ACCESS_POSITION);

    if (lastAccessPosition) {
      setLastAccessPosition(lastAccessPosition);
    }
  }

  function onSuccessWatchPosition(position: GeoPosition) {
    setCurrrentPosition(position.coords);
    const positionWithouSpeed: Position = {
      ...position.coords,
      speed: null
    };
    storeData(constants.LAST_ACCESS_POSITION, positionWithouSpeed);
  }

  function onErrorWatchPosition(error: GeoError) {
    crashlytics().recordError(new Error(error.message));
  }

  function onPressPositionOptionToShow(option: PositionToShowOption) {
    setPositionToShowOption(option);
  }

  function onPressLogout() {
    logout();
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasPermission) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Tela Home</Text>
        <Text style={styles.subtitle}>
          Escolha a localização que deseja ver:
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            label="Atual"
            onPress={() => onPressPositionOptionToShow('current')}
          />
          {lastAccessPosition && (
            <Button
              label="Último acesso"
              onPress={() => onPressPositionOptionToShow('lastAccess')}
            />
          )}
        </View>
        <View style={styles.content}>
          <MapView
            region={{
              latitude: positionToShow.latitude,
              longitude: positionToShow.longitude,
              latitudeDelta: 0.0068,
              longitudeDelta: 0.0075
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: positionToShow.latitude,
                longitude: positionToShow.longitude
              }}>
              <Icon name={markerIcon} size={30} />
            </Marker>
          </MapView>
        </View>
        <Button label="SAIR" style={styles.button} onPress={onPressLogout} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.needPermissionContainer}>
        <Text style={styles.needPermission}>
          Você precisa autorizar localização
        </Text>
        <Button
          label="Tentar novamente"
          style={styles.tryAgainButton}
          onPress={requestPermission}
        />
      </View>
    </View>
  );
}
