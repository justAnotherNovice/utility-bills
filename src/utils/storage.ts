import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData(key: string, type: string) {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data ?? type);
}

export async function saveData(key: string, data: any) {
  if (data) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }
}
