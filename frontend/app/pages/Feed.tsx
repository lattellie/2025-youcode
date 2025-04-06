// app/pages/Page2.tsx
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import GalleryImage from '../components/GalleryImage';

type Props = {
  navigation: any;
};

const Feed: React.FC<Props> = ({ navigation }) => {
  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  const images = [
  { id: 1, source: require('../../assets/cameraScaledDown.png') },
  { id: 2, source: require('../../assets/cameraScaledDown.png') },
  { id: 3, source: require('../../assets/cameraScaledDown.png') },
  ];
  const [value, setValue] = useState("null");
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Explore</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
          console.log("Selected:", item);
        }}
      />

      {images.map((img) => (
        <GalleryImage key={img.id} source={img.source} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '50%',
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
  // gallery: {
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // image: {
  //   width: 300,
  //   height: 300,
  //   marginBottom: 16,
  //   borderRadius: 12,
  // },
});

export default Feed;