// app/pages/Page2.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  navigation: any;
};

const Gallery: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gallery</Text>
      <Button
        title="Go back to Main"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Gallery;