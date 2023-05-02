import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {serverUrl} from '../../config/ServerUrl';

const LeaderBoardScreen = () => {
  const [data, setData] = useState([]);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.score}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );

  const getScore = async () => {
    axios({
      method: 'GET',
      url: `${serverUrl}/api/game/leaderboard`,
    })
      .then(async response => {
        console.log('response', response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  useEffect(() => {
    getScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leader Board</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#ff7f50',
  },
  item: {
    width: '80%',
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  score: {
    fontSize: 16,
    color: '#000',
  },
});

export default LeaderBoardScreen;
