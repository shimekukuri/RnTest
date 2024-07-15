import {Button, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useState} from 'react';
import {addToString, setToInitialState} from '../../features/featureB/featureB';

export function FeatureB() {
  const value = useSelector((state: RootState) => state.FeatureBReducer.value);
  const dispatch: AppDispatch = useDispatch();
  const [textInput, setTextInput] = useState<string>('');

  return (
    <View>
      <Text>Feature B Screen</Text>
      <TextInput
        value={textInput}
        onChangeText={text => setTextInput(_ => text)}
      />
      <Button
        title="Add To string"
        onPress={() => {
          dispatch(addToString(textInput));
        }}
      />
      <Button
        title="Set to initial state"
        onPress={() => {
          dispatch(setToInitialState());
        }}
      />
      <Text>{value}</Text>
    </View>
  );
}
