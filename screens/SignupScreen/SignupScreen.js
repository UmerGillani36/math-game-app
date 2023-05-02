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

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // TODO: Implement login functionality
    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      if (password.trim() === confirmPassword.trim()) {
        axios({
          method: 'POST',
          url: `${serverUrl}/api/auth/signup`,
          data: {
            name,
            email,
            password,
          },
        })
          .then(async response => {
            console.log('response', response);
            if (response.status === 201) {
              await AsyncStorage.setItem('auth', response.data.token);
              setName('');
              setPassword('');
              setEmail('');
              setConfirmPassword('');
              navigation.navigate('Home');
            }
          })
          .catch(err => {
            console.log('Error: ', err);
          });
      } else {
        setError('Passwords do not match');
      }
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
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        onChangeText={e => handleInputChange(e, setName)}
        value={name}
        keyboardType="email-address"
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        onChangeText={e => handleInputChange(e, setConfirmPassword)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.subText}>Login</Text>
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
  loginText: {
    marginTop: 20,
    color: 'grey',
  },
  subText: {
    color: '#ff7f50',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
