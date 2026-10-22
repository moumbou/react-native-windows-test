import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

const appStorage = createAsyncStorage('app');

export const storage: StateStorage = {
  getItem: key => appStorage.getItem(key),
  setItem: (key, value) => appStorage.setItem(key, value),
  removeItem: key => appStorage.removeItem(key),
};
