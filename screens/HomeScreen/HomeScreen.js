import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverUrl} from '../../config/ServerUrl';

const HomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [answer, setAnswer] = useState('');

  const handleAnswer = async () => {
    // TODO: Implement answer functionality
    const token = await AsyncStorage.getItem('auth');
    const sum = num1 + num2;
    const isCorrect = parseInt(answer) === sum;
    if (isCorrect) {
      axios({
        method: 'POST',
        url: `${serverUrl}/api/game/success`,
        data: {
          token,
        },
      })
        .then(async response => {
          console.log('response', response);
          navigation.navigate('Result', {correct: isCorrect});
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    } else {
      navigation.navigate('Result', {correct: isCorrect});
    }
  };

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);
    setAnswer('');
  };

  useEffect(() => {
    if (isFocused) {
      generateQuestion();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Math Game</Text>
      <Text style={styles.text}>
        {num1} + {num2} = ?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Answer"
        placeholderTextColor="#999"
        onChangeText={setAnswer}
        value={answer}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>Answer</Text>
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
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ff7f5088',
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
    textAlign: 'center',
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
});

export default HomeScreen;
