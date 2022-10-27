import {REACT_APP_MOCK_API} from '@env';
import ky from 'ky';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {Leader, LeaderResponse} from '../interfaces/leader';
import {mockLeaders} from '../mocks/leader';
import styles from '../styles/global';

const LeaderBoardScreen = ({navigation, route}: any) => {
  const {params} = route;
  const username = params?.username;
  const age = params?.age;
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    if (REACT_APP_MOCK_API === 'true') {
      appendPlayerAndSort(mockLeaders);
    } else {
      try {
        const json: LeaderResponse = await ky
          .get('https://dummyjson.com/users')
          .json();
        appendPlayerAndSort(json.users);
      } catch (error) {
        console.log('[fetchLeaders]:', error);
      }
    }
  };

  const appendPlayerAndSort = (leaders: Leader[]) => {
    if (username) leaders.push({username, age} as Leader);
    setLeaders(leaders.sort((a, b) => b.age - a.age));
  };

  return (
    <ScrollView style={styles.p20}>
      {leaders.map(leader => (
        <List.Item
          key={`${leader.username}`}
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
