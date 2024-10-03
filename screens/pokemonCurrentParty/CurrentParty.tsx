import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, FlatList, StyleSheet, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {RootStackParamList} from '../StackNav/Navigator';
import {removePartyMember} from '@/features/pokemonParty/PokePartySlice';
import {updateParty} from '@/features/pokemonPartyStore/PokemonPartyStore';
import {useEffect} from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'currentParty'>;

export function CurrentParty({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const party = useSelector((state: RootState) => state.PokemonPartyReducer);

  let content;

  if (!party) {
    content = (
      <View>
        <Text>Party not found or no saved parties</Text>
      </View>
    );
  }

  useEffect(() => {
    dispatch(updateParty(party));
  }, [party]);

  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={party.party}
        keyExtractor={({id}) => id}
        contentContainerStyle={styles.container}
        renderItem={({item: {pokemon, id}}) => {
          return (
            <View style={styles.item}>
              <Image
                src={pokemon.sprites?.front_default}
                style={styles.sprite}
              />
              <Text>{pokemon.name}</Text>
              <Button
                onPress={() => {
                  dispatch(removePartyMember(id));
                }}
                title={'Remove'}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
  },
  sprite: {
    width: 50,
    height: 50,
  },
});
