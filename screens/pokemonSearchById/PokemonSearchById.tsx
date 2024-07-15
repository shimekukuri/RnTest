import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useGetPokemonByIdQuery} from '../../features/pokemonApi/pokemonApiSlice';
import {Dispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {
  PokeParty,
  addPartyMember,
} from '../../features/pokemonParty/PokePartySlice';
import {RootState} from '@/store/store';
import {updateParty} from '@/features/pokemonPartyStore/PokemonPartyStore';

type Props = NativeStackScreenProps<RootStackParamList, 'pokemonSearch'>;

export function PokemonSearchById({
  navigation,
  route: {
    params: {pokemon},
  },
}: Props) {
  const {data, isError, error, isLoading, isSuccess} =
    useGetPokemonByIdQuery(pokemon);
  const dispatch: Dispatch = useDispatch();
  const currentParty: PokeParty = useSelector(
    (state: RootState) => state.PokemonPartyReducer,
  );

  let content;

  if (isLoading) {
    content = (
      <View>
        <Text>Is Loading</Text>
      </View>
    );
  } else if (isError) {
    console.error(error);
    content = (
      <View>
        <Text>An error has occured</Text>
      </View>
    );
  } else if (isSuccess && data?.sprites?.front_default) {
    return (
      <View>
        <Text>fetch succeeded</Text>
        <Image
          style={styles.pokeImage}
          source={{uri: data?.sprites?.front_default ?? ''}}
        />
        <Button
          title="add pokemon to party"
          onPress={() => {
            dispatch(addPartyMember(data));
            navigation.navigate('currentParty');
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>{pokemon}</Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  pokeImage: {
    width: 200,
    height: 200,
  },
});
