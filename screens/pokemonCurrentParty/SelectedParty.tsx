import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import { RootStackParamList } from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'selectedParty'>;

export function SelectedParty({
  navigation,
  route: {
    params: {partyId},
  },
}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const party = useSelector(
    (state: RootState) => state.PokeStoreReducer,
  ).store.filter(({id}) => id === partyId)[0];

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
