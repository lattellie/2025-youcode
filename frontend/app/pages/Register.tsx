// app/pages/Page2.tsx
import React from 'react';
import {ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStorage } from '../hooks/useStorage';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utilities/notification';


type Props = {
  navigation: any;
};

const Register: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Expo push token:', token);
        setExpoToken(token); // ✅ save to state
      }
    });
  
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('📩 Received notification:', notification);
    });
  
    return () => subscription.remove();
  }, []);
  

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [accessCode, setAccessCode] = React.useState('');
  const { storeUserData } = useStorage();
  const [expoToken, setExpoToken] = React.useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoToken(token); // ✅ save to state
      }
    });
  
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('📩 Received notification:', notification);
    });
  
    return () => subscription.remove();
  }, []);
  

  const handleRegister = async() => {
    if (!firstName || !lastName || !username || !email || !password || !accessCode) {
      alert('⚠️ Please fill in all fields before registering.');
      return;
    }

    const userData = {
      "first_name": firstName,
      "last_name": lastName,
      "username": username,
      "email": email,
      "pwd": password,
      "club_code": accessCode,
      "expo_token": expoToken,
    }

    try {
      // Send to backend API
      const response = await fetch('https://excited-frog-reasonably.ngrok-free.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log('✅ Registration result:', result);

      if (result.user_id) {
        // 3. Save userId locally
        // await storeUserId(result.user_id);
        await storeUserData({"user_id": result.user_id, ...userData})
        console.log('userId received and stored:', result.user_id);
      } else {
        console.warn('No userId returned from backend');
      }
    navigation.navigate('Login');
  }
    catch (error) {
      console.error('Error during registration:', error);
    }
  };


  return (
    <ImageBackground
      source={require("../../assets/background.png")} // 👈 your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.head}>Register for an account</Text>
        <Text style={styles.text}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log in!{" "}
          </Text>
        </Text>
        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputColumn}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Access Code"
              value={accessCode}
              onChangeText={setAccessCode}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>Continue with</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.buttonContent}>
          <FontAwesome name="facebook" size={16} color="white" />
          <Text style={styles.fakeButtonText}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.buttonContent}>
            <FontAwesome name="google" size={16} color="#000000" />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.appleButton}>
          <View style={styles.buttonContent}>
            <FontAwesome name="apple" size={16} color="white" />
            <Text style={styles.fakeButtonText}>Login with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  link:{
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  head:{
    fontSize: 24,
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: 80,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 50,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  facebookButton: {
    flexDirection: 'row',
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 1,
    width: '50%',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#9AA0A6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 10,
    marginBottom: 1,
    width: '50%',
    alignItems: 'center',
  },
  fakeButtonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    
  },
  googleButtonText: {
    marginLeft: 8,
    color: '#000000',
    fontWeight: '600',
    flexShrink: 1,
  },
  appleButton: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  logo: {
    width: 10,
    height: 10,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 12,
    marginBottom: 10,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    gap: 20,
  },
  
  inputColumn: {
    flex: 1,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    width: '100%',
  },

});

export default Register;