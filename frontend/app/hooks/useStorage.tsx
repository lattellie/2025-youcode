import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const useStorage = (key: string) => {
    const [data, setData] = useState<any>(null);

  // Save to AsyncStorage when data changes
  useEffect(() => {
    if (data !== null) {
      AsyncStorage.setItem(key, JSON.stringify(data))
        .then(() => console.log(`[${key}] saved locally`, data))
        .catch((e) => console.error(`Failed to save [${key}]`, e));
    }
  }, [data]);

  return {setData};
};

export const storeUserId = async (userId: string) => {
    try {
      await AsyncStorage.setItem('userId', userId);
      console.log('userId saved locally:', userId);
    } catch (err) {
      console.error('Failed to save userId', err);
    }
  };
  
  export const getStoredUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (err) {
      console.error('Failed to retrieve userId', err);
      return null;
    }
  };

const buildFormData = (dataObj: any) => {
  const form = new FormData();
  for (let key in dataObj) {
    if (key === 'imageUri') {
      form.append('file', {
        uri: dataObj.imageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
    } else {
      form.append(key, dataObj[key]);
    }
  }
  return form;
  };