import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import { RootStackParamList } from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'currentParty'>;

export function CurrentParty({navigation}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const party = useSelector((state: RootState) => state.PokemonPartyReducer);

  console.log(
    'This is from the Current Party screen upon navigation\n\n this is the party state:\n\n',
    party,
  );

  let content;

  if (!party) {
    content = (
      <View>
        <Text>Party not found or no saved parties</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={party.party}
        keyExtractor={({id}) => id}
        renderItem={({item: {pokemon}}) => {
          console.log(
            'This is the interior of the current party renderItem\n\n var pokemon\n\n',
            pokemon,
          );
          return (
            <View>
              <Text>{pokemon.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
