import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState} from 'react';
import {RootStackParamList} from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'pokemonSearchInput'>;

export function PokemonSearchInputScreen({navigation}: Props) {
  const [search, setSearch] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Poke Search</Text>
      <TextInput
        style={styles.input}
        value={search}
        autoCorrect={false}
        onChangeText={text => setSearch(_ => text)}
        placeholder="Name/Number"
      />
      <Button
        title="Submit"
        onPress={() => {
          if (!search.length) {
            return;
          }
          navigation.navigate('pokemonSearch', {pokemon: search.toLowerCase()});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    fontSize: 20,
    borderColor: 'red',
    padding: 8,
  },
  header: {
    fontSize: 40,
  },
  button: {
    fontSize: 20,
  },
});
