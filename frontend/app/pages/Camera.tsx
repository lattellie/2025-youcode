import { CameraMode, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImageManipulator from 'expo-image-manipulator';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uriFront, setUriFront] = useState<string | null>(null);
  const [uriBack, setUriBack] = useState<string | null>(null);
  const [donePhoto, setDonePhoto] = useState<boolean>(false);

  const [mode, setMode] = useState<CameraMode>('picture');
  const [facing, setFacing] = useState<CameraType>('back');
  const [savedUri, setSavedUri] = useState<string | null>(null);
  const convertImageToBase64 = async (uri:string) => {
    try {
      // Manipulate the image (no actual changes are made, just converting)
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { base64: true }
      );
      // console.log('Base64 Image:', manipResult.base64);
      return manipResult.base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };
  
  
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
      if (uriFront && uriBack) {
        const uuid = uuidv4();
        console.log(uuid);
        const img64 = await convertImageToBase64(uriFront);
        const img64b = await convertImageToBase64(uriBack);
        // console.log(img64)

        console.log("sending");
        const response = await fetch('https://excited-frog-reasonably.ngrok-free.app/upload', {
          method: 'POST', 
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify({
            fname:`${uuid}_f.jpg`,
            fimage: img64,
            bname:`${uuid}_b.jpg`,
            bimage: img64b,
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
        


      // console.log("sending...")
      // const response = await fetch('http://206.87.123.80:3000/data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message: uriFront
      //   }),
      // });
      // console.log(response)
      // console.log("after request")
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // } else {
      //   const result = await response.json();
      //   console.log(result);
      // }


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
