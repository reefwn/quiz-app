import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import NavigationBar from './app/components/NavigationBar';
import LeaderBoardScreen from './app/screens/Leaderboard';
import QuizScreen from './app/screens/Quiz';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Quiz"
          screenOptions={{
            header: (props: NativeStackHeaderProps) => (
              <NavigationBar {...props} />
            ),
          }}>
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen
            name="LeaderBoard"
            component={LeaderBoardScreen}
            options={{title: 'Leaderboard'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
