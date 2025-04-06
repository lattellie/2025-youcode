// components/GalleryImage.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  source: any; // local require() OR { uri: string }
};

const GalleryImage: React.FC<Props> = ({ source }) => {
  return (
    <Image
      source={source}
      style={styles.image}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
  },
});

export default GalleryImage;