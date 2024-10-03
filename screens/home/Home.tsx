import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../StackNav/Navigator';
import {PokeHomeButtonController} from '../pokeHome/pokeHomeButtonController/PokemonHomeButtonController';
import {testData} from '../pokeHome/pokeHomeButtonData/testData';

type Props = NativeStackScreenProps<RootStackParamList>;

export function Home({navigation}: Props) {
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
