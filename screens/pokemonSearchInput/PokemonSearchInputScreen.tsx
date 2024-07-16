import {Button, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import { RootStackParamList } from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'pokemonSearchInput'>;

export function PokemonSearchInputScreen({navigation}: Props) {
  const [search, setSearch] = useState<string>('');

  return (
    <View>
      <TextInput value={search} onChangeText={text => setSearch(_ => text)} />
      <Button
        title="Submit"
        onPress={() => {
          navigation.navigate('pokemonSearch', {pokemon: search.toLowerCase()});
        }}
      />
    </View>
  );
}
