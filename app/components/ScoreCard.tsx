import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import styles from '../styles/global';

export interface IScoreCard {
  score: number;
}

const ScoreCard = (props: IScoreCard) => {
  return (
    <Card mode="contained">
      <Card.Content>
        <View style={styles.flexCenter}>
          <Text variant="titleSmall">
            Your Score is: <Text variant="titleLarge">{props.score}</Text>
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ScoreCard;
