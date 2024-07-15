import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from 'App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {
  updateParty,
  removeParty,
} from '@/features/pokemonPartyStore/PokemonPartyStore';
import {loadParty} from '@/features/pokemonParty/PokePartySlice';

type Props = NativeStackScreenProps<RootStackParamList, 'savedParties'>;

export function SavedParties({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const currentParty = useSelector(
    (store: RootState) => store.PokemonPartyReducer,
  );
  const parties = useSelector(
    (state: RootState) => state.PokeStoreReducer.store,
  );

  return (
    <View>
      <FlatList
        data={parties}
        keyExtractor={({id}) => id}
        renderItem={({item: {id, party}}) => {
          return (
            <View>
              <Text>{id}</Text>
              <FlatList
                data={party}
                keyExtractor={({id}) => id}
                renderItem={({
                  item: {
                    pokemon: {name},
                  },
                }) => {
                  return (
                    <View>
                      <Text>{name}</Text>
                    </View>
                  );
                }}
              />
              <Button
                title="Remove Party"
                onPress={() => dispatch(removeParty(id))}
              />
              <Button
                title="Load Party"
                onPress={() => dispatch(loadParty({id, party}))}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
