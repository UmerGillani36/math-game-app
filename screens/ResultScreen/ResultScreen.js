import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ResultScreen = ({navigation, route}) => {
  const {correct} = route.params;

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard');
  };

  const handleNextPress = () => {
    navigation.goBack();
  };

  const backgroundColor = correct ? '#67C23A' : '#F56C6C';
  const text = correct ? 'Correct' : 'Incorrect';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLeaderboardPress}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#ffc0cb',
    borderRadius: 8,
    padding: 12,
    margin: 8,
    width: '80%',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ResultScreen;
