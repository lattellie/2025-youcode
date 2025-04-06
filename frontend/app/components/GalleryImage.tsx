import React from 'react';
import { Text, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const GalleryImage: React.FC<any> = ({ img }) => {
  const [flip, setFlip] = React.useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setFlip(!flip)}>
      <View>
        <Image
          source={flip ? { uri: img.back_url } : { uri: img.front_url }}
          style={[styles.image]}
        />
        {/* {img.tags.map((tag: any) => (
          <Text>{tag}</Text>
        ))} */}
        <View style={styles.tagContainer}>
          {img.tags?.map((tag: string, index: number) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    marginBottom: 1,
    borderRadius: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "#bdfcac",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
});

export default GalleryImage;

