import { CameraMode, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from '../hooks/useStorage';
const { width, height } = Dimensions.get('window');

type Props = {
  navigation: any;
};

const Camera: React.FC<Props> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uriFront, setUriFront] = useState<string | null>(null);
  const [uriBack, setUriBack] = useState<string | null>(null);
  const [donePhoto, setDonePhoto] = useState<0|1|2|3>(0);
  const [isOutdoor, setOutdoor] = useState<boolean | null> (null);
  const [tags, setTags] = useState<string[]> ([]);
  const [facing, setFacing] = useState<CameraType>('back');
  const [modalVisible, setModalVisible] = useState(false);
  const { getUserData } = useStorage();
  const convertImageToBase64 = async (uri:string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { base64: true }
      );
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
      setDonePhoto(1);
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
  const switchFB = () => {
    if (uriFront && uriBack){
      const temp:string = uriFront;
      setUriFront(uriBack);
      setUriBack(temp);
    }
  }
  const renderResult= () =>{
    return (
      <View style={{flex:1, justifyContent: 'center',alignContent:'center'}}>
        <View style={{width:width, alignItems:'center'}}>
          {uriFront && (
            <Pressable onPress={switchFB}>
            <Image 
              source={{ uri: uriFront }} 
              contentFit="contain" 
              style={{ 
                width: width*0.8, 
                aspectRatio: 1 
              }} 
            />
            </Pressable>
          )}
          {uriBack && (
            <Pressable
              onPress={switchFB}
              style={{     
                position: 'absolute',
                top: '-10%',
                left: '5%',
                width: '30%',
                height: '40%',
                borderColor:'white',
                borderWidth:5,
                zIndex: 1
              }}
            >
            <Image 
              source={{ uri: uriBack }} 
              style={{
                width:'100%',
                height:'100%'
            }}
            />
            </Pressable>
          )}
        </View>
        <View style={styles.tagContainer}>
            <Text style={styles.displayText}>Yayy! You are Outdoor!</Text>
            <Text >Click on the tag to explore your community</Text>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={[styles.tag,]}>
                <Text style={styles.buttonText}>{tag}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity key={'feed tag'} style={styles.button} onPress={()=>{navigation.navigate('Feed')}}>
              <Text style={styles.buttonText}>Process To Feed</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
  const renderPicture = () => {
    return (
      <View >
        {uriFront && (
          <Pressable onPress={switchFB}>
          <Image 
            source={{ uri: uriFront }} 
            contentFit="contain" 
            style={{ width: width, aspectRatio: 1 }} 
          />
          </Pressable>
        )}
        {uriBack && (
          <Pressable
            onPress={switchFB}
            style={{     
              position: 'absolute',
              top: '-10%',
              left: '5%',
              width: '40%',
              height: '40%',
              borderColor:'white',
              borderWidth:10,
              zIndex: 1
            }}
          >
          <Image 
            source={{ uri: uriBack }} 
            style={{
              width:'100%',
              height:'100%'
           }}
          />
          </Pressable>
        )}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{
                backgroundColor:'white',
                borderColor:'black',
                borderWidth:10,
                borderRadius:20,
                margin:20,
                top:'15%',
                height:'60%',
                alignItems:'center',
                justifyContent:'center'
              }}>
          <TouchableOpacity style={{width:'90%', alignItems:'flex-end'}} onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" size={30} color="black" />
          </TouchableOpacity>
  
          <View style={styles.tagContainer}>
            <Text style={styles.displayText}>Outdoor not detected, retake?</Text>
            {tags.map((tag, index) => (
              <TouchableOpacity key={index} style={[styles.tag,]}>
                <Text style={styles.buttonText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
                <View style={styles.oneLine}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={()=>{navigation.navigate('MainPage');setModalVisible(false)}}>Back to Main</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>{setDonePhoto(0);setFacing('back');setUriBack(null);setUriFront(null);setModalVisible(false)}}>
                    <Text style={styles.buttonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </Modal>
        <View style={styles.oneLine}>
          <TouchableOpacity
            style={styles.button}
            onPress={sendToServer}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {setDonePhoto(0); setUriFront(null); setUriBack(null);setOutdoor(null);setModalVisible(false)}}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
        </View>
    );
  };

  const sendToServer = async () => {
    try {
      if (uriFront && uriBack) {
        const { user_id } = await getUserData();
        const img64 = await convertImageToBase64(uriFront);
        const img64b = await convertImageToBase64(uriBack);

        console.log(`sending ${user_id}`);
        const req = await fetch('https://excited-frog-reasonably.ngrok-free.app/upload', {
          method: 'POST',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            "user_id": user_id,
            "fimage": img64,
            "bimage": img64b
          })})

          const res = await req.json();
          console.log(res);
          console.log(req.ok);
          if (req.ok) {
            // outdoor
            setOutdoor(true)
            setTags(res.tags)
            // setModalVisible(false)
            console.log(`is outdoor: ${isOutdoor}, tags: ${tags}`)
            setDonePhoto(2)
            // navigation.navigate('Feed');
          } else {
            setOutdoor(false)
            setTags(res.tags)
            console.log(`is not Outdoor: ${isOutdoor}, tags: ${tags}`)

            setModalVisible(true);
            // setDonePhoto(2)
          }
        
      }
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  const renderCamera = () => {
    return (
      <CameraView
        style={[styles.camera,{justifyContent:'center'}]}
        ref={ref}
        mode="picture"
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
        <Pressable onPress={()=>{navigation.goBack()}}>
          <Ionicons name="home" size={48} color="white" /> 
        </Pressable>
        <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View style={[styles.shutterBtn, { opacity: pressed ? 0.5 : 1,},]}>
                <View style={[styles.shutterBtnInner, {backgroundColor:"white", opacity: pressed ? 0.5 : 1},]}/>
              </View>
            )}
          </Pressable>
        <Pressable onPress={toggleFacing}>
          <Ionicons name="camera-reverse" size={48} color="white" /> 
        </Pressable>
        </View>
      </CameraView>
    );
  };

  return <View style={styles.container}>
    {donePhoto==0 ? renderCamera(): (donePhoto==1? renderPicture(): renderResult())}</View>;
}

const styles = StyleSheet.create({
  tagContainer: {
    width:width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start', 
    padding: 10, 
  },
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
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  tag: {
    backgroundColor: '#b0b0b0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal:5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal:5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  displayText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  oneLine: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  }
});

export default Camera;
