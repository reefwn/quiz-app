import {REACT_APP_MOCK_API} from '@env';
import ky from 'ky';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Card,
  Chip,
  ProgressBar,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {Question, QuestionResponse} from '../interfaces/question';
import {mockQuestions} from '../mocks/question';
import styles from '../styles/global';

const QuizScreen = ({navigation, router}: any) => {
  const [username, setUsername] = useState('');
  const [isUsernameConfirm, setIsUsernameConfirm] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    if (REACT_APP_MOCK_API === 'true') {
      setQuestions(randomize(mockQuestions));
    } else {
      try {
        const json: QuestionResponse = await ky
          .get('https://opentdb.com/api.php?amount=20&type=multiple', {})
          .json();
        setQuestions(randomize(json.results));
      } catch (error) {
        console.log('[fetchQuestions]:', error);
      }
    }
  };

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

  const handleNext = () => {
    if (answer === questions[questionIndex].correct_answer) {
      setScore(score + 1);
    }
    setAnswer('');
    setChoices([]);
    setIsShuffled(false);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setChoices([]);
    setIsShuffled(false);
    setAnswer('');
    setScore(0);
    setQuestionIndex(0);
    setIsFinished(false);
    fetchQuestions();
  };

  return (
    <View style={styles.p20}>
      {isUsernameConfirm ? (
        <View>
          <View style={styles.flexCenter}>
            <Chip
              icon="account"
              onPress={() => {
                setIsUsernameConfirm(false);
              }}>
              {username}
            </Chip>
            <Chip icon="gamepad-variant">
              {score} / {questionIndex + 1}
            </Chip>
          </View>
          <View style={styles.my20}>
            <ProgressBar progress={(questionIndex + 1) / questions.length} />
          </View>
          {!isFinished ? (
            <Card style={styles.pt20} mode="contained">
              <Card.Title
                title={`${questionIndex + 1}. ${
                  questions[questionIndex].question
                }`}
                titleNumberOfLines={5}
              />
              <Card.Content>
                <RadioButton.Group
                  onValueChange={value => setAnswer(value)}
                  value={answer}>
                  {renderChoices(questions[questionIndex])}
                </RadioButton.Group>
              </Card.Content>
            </Card>
          ) : (
            <Card mode="contained">
              <Card.Content>
                <View style={styles.flexCenter}>
                  <Text variant="titleSmall">
                    Your Score is: <Text variant="titleLarge">{score}</Text>
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
          <View style={styles.mt20}>
            {!isFinished ? (
              <Button
                mode="contained-tonal"
                disabled={!answer}
                onPress={() => handleNext()}>
                Next
              </Button>
            ) : (
              <View>
                <Button mode="contained-tonal" onPress={() => handleRetry()}>
                  Retry
                </Button>
                <Button
                  onPress={() =>
                    navigation.navigate('LeaderBoard', {username, age: score})
                  }
                  mode="text"
                  style={styles.mt100}
                  icon="medal">
                  Leaderboard
                </Button>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            label="Player Name"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <View style={styles.mt20}>
            <Button
              mode="contained-tonal"
              onPress={() => setIsUsernameConfirm(true)}>
              Confirm
            </Button>
            <Button
              onPress={() => navigation.navigate('LeaderBoard')}
              mode="text"
              style={styles.mt100}
              icon="medal">
              Leaderboard
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;
