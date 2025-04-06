// app/pages/MainPage.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  navigation: any;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Page</Text>
      <Button
        title="Explore"
        onPress={() => navigation.navigate('Feed')}
      />
      <Button
        title="Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Gallery"
        onPress={() => navigation.navigate('Gallery')}
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

export default MainPage;
