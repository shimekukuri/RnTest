import {FlatList, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from 'App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {updateParty} from '@/features/pokemonPartyStore/PokemonPartyStore';

type Params = NativeStackScreenProps<RootStackParamList, 'savedParties'>;

export function SavedParties() {
  const dispatch: AppDispatch = useDispatch();
  const currentParty = useSelector(
    (store: RootState) => store.PokemonPartyReducer,
  );
  dispatch(updateParty(currentParty));
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
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
