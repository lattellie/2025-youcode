// app/pages/Page2.tsx
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({ navigation }) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ImageBackground
      source={require("../../assets/background.png")} // 👈 your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.head}>Login to your account</Text>
        <Text style={styles.text}>
          Doesn't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up!{" "}
          </Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainPage")}
        >
          <Text style={styles.buttonText}>Login</Text>
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
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: 105,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    width: '50%'
  },
  button: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 40,
    marginTop: 30,
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
    fontSize: 16,
    fontWeight: '600',
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
  }

});

export default Login;