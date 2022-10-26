import ky from 'ky';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {Leader, LeaderResponse} from '../interfaces/leader';
import styles from '../styles/global';

const LeaderBoardScreen = ({navigation, route}: any) => {
  const {username, age} = route.params;
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const json: LeaderResponse = await ky
        .get('https://dummyjson.com/users')
        .json();
      const users = json.users;
      if (username) users.push({username, age} as Leader);
      setLeaders(users.sort((a, b) => b.age - a.age));
    } catch (error) {
      console.log('[fetchLeaders]:', error);
    }
  };

  return (
    <ScrollView style={styles.p20}>
      {leaders.map(leader => (
        <List.Item
          title={`${leader.username}`}
          description={`${leader.age}`}
          left={props =>
            leader.image ? (
              <Avatar.Image {...props} source={{uri: leader.image}} />
            ) : (
              <Avatar.Icon {...props} icon="account" />
            )
          }
          right={props => <List.Icon icon="medal" {...props} />}
        />
      ))}
    </ScrollView>
  );
};

export default LeaderBoardScreen;
