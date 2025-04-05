import { CameraMode, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';  // Import expo-file-system

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uriFront, setUriFront] = useState<string | null>(null);
  const [uriBack, setUriBack] = useState<string | null>(null);
  const [donePhoto, setDonePhoto] = useState<boolean>(false);

  const [mode, setMode] = useState<CameraMode>('picture');
  const [facing, setFacing] = useState<CameraType>('back');
  const [savedUri, setSavedUri] = useState<string | null>(null);

  // const saveImageToDisk = async (uri: string) => {
  //   try {
  //     // Define a new file path to save the image
  //     const fileName = `${FileSystem.documentDirectory}${new Date().toISOString()}.jpg`;  // Unique filename with current timestamp

  //     // Move the image from its URI to the new location
  //     await FileSystem.moveAsync({
  //       from: uri,
  //       to: fileName,
  //     });

  //     // Update the saved URI
  //     setSavedUri(fileName);
  //     console.log('Image saved to disk at:', fileName);
  //   } catch (error) {
  //     console.error('Error saving image:', error);
  //   }
  // };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    // Take front-facing picture
    if (uriFront) {
      const backPhoto = await ref.current?.takePictureAsync();
      if (backPhoto) {
        setUriBack(backPhoto.uri);
        console.log('Back photo taken:', backPhoto.uri);
      }
      setDonePhoto(true);
    } else {
      const frontPhoto = await ref.current?.takePictureAsync();
      if (frontPhoto) {
        setUriFront(frontPhoto.uri);
        console.log('Front photo taken:', frontPhoto.uri);
      }  
      toggleFacing()
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
    console.log(`setting facing to ${facing}`);
  };

  const renderPicture = () => {
    sendToServer()
    return (
      <View>
        {uriFront && (
          <Image source={{ uri: uriFront }} contentFit="contain" style={{ width: 300, aspectRatio: 1 }} />
        )}
        {uriBack && (
          <Image source={{ uri: uriBack }} contentFit="contain" style={{ width: 300, aspectRatio: 1 }} />
        )}
        <Button onPress={sendToServer} title="upload" />
        <Button onPress={() => {setDonePhoto(false); setUriFront(null); setUriBack(null)}} title="Take another picture" />
      </View>
    );
  };

  const sendToServer = async () => {
    try {
      if (uriFront) {
        const imgResponse = await fetch(uriFront);
        const imageBlob = await imgResponse.blob();
        const formData = new FormData()
        formData.append('image', imageBlob);
        console.log("sending...")
    
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: JSON.stringify({
            message: 'Hello from Expo!',
          }),
        });

        console.log("after request")
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const result = await response.json();
          console.log(result);
        }
    
        
      }
  
      // const response = await fetch('http://206.87.123.80:3000/data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message: uriFront
      //   }),
      // });

    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode="picture"
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <Pressable style={styles.shutterBtn} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <Text style={styles.text}>Rotate</Text>
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return <View style={styles.container}>{donePhoto ? renderPicture() : renderCamera()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
