import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {Button, Text, View} from 'react-native';
import {decrement, increment} from '../../features/featureA/featureA';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'featureA'>;

export function FeatureA({}: Props) {
  const value = useSelector((state: RootState) => state.FeatureAReducer.value);
  const dispatch: AppDispatch = useDispatch();
   
  return (
    <View>
      <Button title="increment" onPress={() => dispatch(increment())} />
      <Button title="decrement" onPress={() => dispatch(decrement())} />
      <Text>{value}</Text>
    </View>
  );
}
