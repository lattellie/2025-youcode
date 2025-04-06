// app/pages/Page2.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

const Register: React.FC<Props> = ({ navigation }) => {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Register for an account</Text>
      <Text style={styles.text}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Log in!{" "}
        </Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Continue with</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.facebookButton}>
        <FontAwesome name="facebook" size={16} color="white" />
        <Text style={styles.fakeButtonText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={16} color="#9AA0A6" />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.appleButton}>
        <FontAwesome name="apple" size={16} color="white" />
        <Text style={styles.fakeButtonText}>Login with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
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
    marginVertical: 70,
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
    backgroundColor: '#ffffff',
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
    color: '#9AA0A6',
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
  }

});

export default Register;