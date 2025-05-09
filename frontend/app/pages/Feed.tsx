// app/pages/Feed.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import GalleryImage from '../components/GalleryImage';

type Props = {
  navigation: any;
};

const Feed: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [images, setImages] = useState<any[]>([]);

  const data = [
    { label: 'No Selection', value: null },
    { label: 'Outdoor Shanghai Club', value: '123' },
    { label: 'Outdoor Jakarta Club', value: 'club_access_code' },
    { label: 'Outdoor Taiwan Group', value: '1234' },
    { label: 'Outdoor Vancouver Group', value: '0' },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://excited-frog-reasonably.ngrok-free.app/photos?${value ? `club=${value}` : ''}`);
        const json = await response.json();

        // const formatted = json.photos.map((photo: any) => ({
        //   id: photo.user_id,
        //   front_url: { uri: photo.front_url },
        //   back_url: { uri: photo.back_url },
        // }));

        setImages(json.photos);
      } catch (err) {
        console.error('Failed to fetch images:', err);
      }
    };

    fetchImages();
  }, [value]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.head}>Explore your feed!</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select groups to view their photos!"
        value={value}
        onChange={(item) => {
          setValue(item.value);
          console.log("Selected:", item);
        }}
      />

      {images.length > 0 ? (
        images.slice().reverse().map((img, idx) => {
          console.log(img);
          return <GalleryImage key={idx} img={img} />;
        })
      ) : (
        <View style={styles.separatorContainer}>
          <View key={'line'} style={styles.line} />
          <Text style={styles.separatorText}>No Post</Text>
          <View key={'line2'} style={styles.line} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    marginTop: 1,
  },
  line: {
    height: 1,
    width: '10%',
    backgroundColor: '#ccc',
  }, 
  separatorText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: '#888',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '70%',
    borderRadius: 8,
    paddingHorizontal: 6,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  head:{
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Feed;
