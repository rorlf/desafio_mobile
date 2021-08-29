import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

function convertItemToData(item) {
  const data = JSON.parse(item);
  return data;
}

function convertDataToItem(data) {
  const item = JSON.stringify(data);
  return item;
}

async function storeData(key, data) {
  try {
    const item = convertDataToItem(data);
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    crashlytics().recordError(e);
  }
}

async function getData(key) {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item !== null) {
      const data = convertItemToData(item);
      return data;
    }
    return null;
  } catch (e) {
    crashlytics().recordError(e);
    return null;
  }
}

async function removeData(key) {
  await AsyncStorage.removeItem(key);
}

const constants = Object.freeze({
  LAST_ACCESS_POSITION: '@last_access_position'
});

export { storeData, getData, removeData, constants };
