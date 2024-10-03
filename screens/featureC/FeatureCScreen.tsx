import {Button, FlatList, Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {removeItem, addItem} from '../../features/featureC/featureC';
import {Children, ReactNode, useState} from 'react';

export function FeatureC() {
  const value = useSelector((state: RootState) => state.featureCReducer.items);
  const dispatch: AppDispatch = useDispatch();
  const [textInput, setTextInput] = useState<string>('');

  return (
    <View>
      <Text>Feature C Screen</Text>
      <TextInput
        value={textInput}
        onChangeText={text => setTextInput(_ => text)}
      />
      <Button
        title="Add item"
        onPress={() => {
          dispatch(addItem({name: textInput, id: value.length}));
          setTextInput('');
        }}
      />
      <FlatList
        data={value}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <Pressable onPress={() => dispatch(removeItem(item))}>
              <Text>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
