import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGetPokemonByIdQuery} from '../../features/pokemonApi/pokemonApiSlice';
import {Dispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {
  PokeParty,
  addPartyMember,
} from '../../features/pokemonParty/PokePartySlice';
import {RootState} from '@/store/store';
import {updateParty} from '@/features/pokemonPartyStore/PokemonPartyStore';
import {useEffect} from 'react';
import {RootStackParamList} from '../StackNav/Navigator';

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

  useEffect(() => {
    dispatch(updateParty(currentParty));
  }, [currentParty]);

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
  } else if (isSuccess && data?.sprites?.front_default && data.name) {
    content = (
      <View style={styles.container}>
        <Text
          style={
            styles.header
          }>{`${data.name[0].toUpperCase()}${data.name.slice(1)}`}</Text>
        <Image
          style={styles.pokeImage}
          source={{uri: data?.sprites?.front_default ?? ''}}
        />
        <FlatList
          data={data.types}
          keyExtractor={({type}) => type!.name!}
          contentContainerStyle={styles.typeContainer}
          renderItem={({item: {type}}) => {
            return <Text>{type!.name!}</Text>;
          }}
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

  return <>{content}</>;
}

const styles = StyleSheet.create({
  pokeImage: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  typeContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  header: {
    fontSize: 50,
  },
});
