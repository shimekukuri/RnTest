import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PokeHomeButtonController} from './pokeHomeButtonController/PokemonHomeButtonController';
import {testData} from './pokeHomeButtonData/testData';
import { RootStackParamList } from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList>;

export function PokeHome({navigation}: Props) {
  return (
    <View style={styles.pokeHomeContainer}>
      <PokeHomeButtonController
        navigation={navigation}
        homeButtons={testData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pokeHomeContainer: {
    flex: 1,
  },
});
