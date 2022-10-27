import React, {useEffect, useState} from 'react';
import {Card, RadioButton} from 'react-native-paper';
import {Question} from '../interfaces/question';
import styles from '../styles/global';

export interface IQuizCard {
  index: number;
  question: Question;
  onValueChange: (val: string) => void;
}

const QuizCard = (props: IQuizCard) => {
  const {index, question, onValueChange} = props;

  const [choices, setChoices] = useState<string[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  useEffect(() => {
    setCurrentAnswer('');
    setIsShuffled(false);
  }, [question]);

  function randomize<T>(arr: T[]) {
    return arr.sort(() => Math.random() - 0.5);
  }

  const renderChoices = (question: Question) => {
    if (!isShuffled) {
      const mc = [question.correct_answer, ...question.incorrect_answers];
      setChoices(randomize(mc));
      setIsShuffled(true);
    }

    return choices.map(choice => (
      <RadioButton.Item key={choice} label={choice} value={choice} />
    ));
  };

  return (
    <Card style={styles.pt20} mode="contained">
      <Card.Title
        title={`${index + 1}. ${question.question}`}
        titleNumberOfLines={5}
      />
      <Card.Content>
        <RadioButton.Group
          onValueChange={value => {
            setCurrentAnswer(value);
            onValueChange(value);
          }}
          value={currentAnswer}>
          {renderChoices(question)}
        </RadioButton.Group>
      </Card.Content>
    </Card>
  );
};

export default QuizCard;
