import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
    // const [data, setData] = useState<any>(null);

  // Save to AsyncStorage when data changes
//   useEffect(() => {
//     if (data !== null) {
//       AsyncStorage.setItem(key, JSON.stringify(data))
//         .then(() => console.log(`[${key}] saved locally`, data))
//         .catch((e) => console.error(`Failed to save [${key}]`, e));
//     }
//   }, [data]);

//   return {setData};
// };
  const storeUserData = async (userData: any) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      console.log('User data saved locally:', userData);
    } catch (err) {  
      console.error('Failed to save user data', err);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      return userData ? JSON.parse(userData) : null;
    } catch (err) {
      console.error('Failed to retrieve user data', err);
      return null;
    }
  };

  const storeUserId = async (userId: string) => {
    try {
      await AsyncStorage.setItem('userId', userId);
      console.log('userId saved locally:', userId);
    } catch (err) {
      console.error('Failed to save userId', err);
    }
  };
  
  const getStoredUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (err) {
      console.error('Failed to retrieve userId', err);
      return null;
    }
  };
  return { storeUserData, getUserData, storeUserId, getStoredUserId };
// const buildFormData = (dataObj: any) => {
  // const form = new FormData();
  // for (let key in dataObj) {
  //   if (key === 'imageUri') {
  //     form.append('file', {
  //       uri: dataObj.imageUri,
  //       name: 'image.jpg',
  //       type: 'image/jpeg',
  //     } as any);
  //   } else {
  //     form.append(key, dataObj[key]);
  //   }
  // }
  // return form;
  };

