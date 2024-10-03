import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../StackNav/Navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {removeParty} from '@/features/pokemonPartyStore/PokemonPartyStore';
import {loadParty} from '@/features/pokemonParty/PokePartySlice';

type Props = NativeStackScreenProps<RootStackParamList, 'savedParties'>;

export function SavedParties({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const parties = useSelector(
    (state: RootState) => state.PokeStoreReducer.store,
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={parties}
        keyExtractor={({id}) => id}
        contentContainerStyle={styles.flastListContainer}
        renderItem={({item: {id, party}}) => {
          return (
            <View style={styles.partyContainer}>
              <Text>{id}</Text>
              <FlatList
                data={party}
                keyExtractor={({id}) => id}
                renderItem={({
                  item: {
                    pokemon: {name, sprites},
                  },
                }) => {
                  return (
                    <View style={styles.pokemonInfoRow}>
                      <Image
                        src={sprites!.front_default}
                        style={styles.pokemonSprite}
                      />
                      <Text>
                        {`${name![0].toUpperCase()}${name!.slice(1)}`}
                      </Text>
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

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  flastListContainer: {
    gap: 4,
  },
  partyContainer: {
    padding: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  pokemonInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonSprite: {
    height: 40,
    width: 40,
  },
});
