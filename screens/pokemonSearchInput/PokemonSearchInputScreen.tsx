import {Button, TextInput, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';

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
