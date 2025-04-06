// app/pages/Page2.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({ navigation }) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login to your account</Text>
      <Text style={styles.text}>
              Doesn't have an account?{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
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
        onPress={() => navigation.navigate('MainPage')}
      >
        <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: 'center',
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
    width: '25%'
  },
  button: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default Login;