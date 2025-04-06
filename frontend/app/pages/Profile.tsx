// app/pages/Page2.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import GalleryImage from '../components/GalleryImage';
import { useStorage } from '../hooks/useStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: any;
};

const Profile: React.FC<Props> = ({ navigation }) => {
  const { getUserData } = useStorage();
  const [images, setImages] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = await getUserData();
        setUserInfo(user);

        if (!user) {
          console.warn('No user ID found');
          return;
        }

        // Fetch user photos
        const response = await fetch(`https://excited-frog-reasonably.ngrok-free.app/photos/${user.user_id}`);
        console.log('response:', response);
        const json = await response.json();
        console.log('Photos fetched from backend:', json);

        // // Fetch userInfo from AsyncStorage
        // const raw = await AsyncStorage.getItem('userInfo');
        // const parsed = raw ? JSON.parse(raw) : null;
        // setUserInfo(parsed);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Profile</Text>
      
      <View style={styles.buttonColumn}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Username</Text>
          <Text style={styles.text}>{userInfo?.username ?? 'Not available'}</Text>

          <Text style={styles.buttonText}>Email</Text>
          <Text style={styles.text}>{userInfo?.email ?? 'Not available'}</Text>

          <Text style={styles.buttonText}>Club ID</Text>
          <Text style={styles.text}>{userInfo?.club_code ?? 'Not available'}</Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 ? images.map((img) => (
        <GalleryImage key={img.id} img={img} />
      )) : <Text>No posts</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "50%",
    borderRadius: 8,
    paddingHorizontal: 6,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  buttonColumn: {
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 23,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    width: 216,
    height: 224,
  },
  buttonText: {
    color: "#171717",
    fontSize: 22,
    fontWeight: "600",
    flexWrap: "wrap",
    marginBottom: 1,
    textAlign: "center",
  },
});

export default Profile;