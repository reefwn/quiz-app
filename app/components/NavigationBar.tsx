import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Appbar} from 'react-native-paper';

const NavigationBar = (props: NativeStackHeaderProps) => {
  return (
    <Appbar.Header>
      {props.back && <Appbar.BackAction onPress={props.navigation.goBack} />}
      <Appbar.Content title={props.options.title || 'Quiz App'} />
    </Appbar.Header>
  );
};

export default NavigationBar;
