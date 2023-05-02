import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {serverUrl} from '../../config/ServerUrl';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // TODO: Implement login functionality
    if (email.trim().length > 0 && password.trim().length > 0) {
      axios({
        method: 'POST',
        url: `${serverUrl}/api/auth/login`,
        data: {
          email,
          password,
        },
      })
        .then(async response => {
          console.log('response', response);
          setEmail('');
          setPassword('');
          await AsyncStorage.setItem('auth', response.data.token);
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    } else {
      setError('All fields must be completed');
    }
  };

  const handleInputChange = (event, setInput) => {
    if (error) {
      setError('');
    }
    setInput(event);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={e => handleInputChange(e, setEmail)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        onChangeText={e => handleInputChange(e, setPassword)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.subText}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff7f50',
  },
  errorText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#ff7f50',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#ff6600',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff660044',
  },
  button: {
    backgroundColor: '#ffc0cb',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    color: 'grey',
  },
  subText: {
    color: '#ff7f50',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
