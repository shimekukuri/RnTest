import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../home/Home';
import {PokeHome} from '../pokeHome/PokeHome';
import {TestScreen} from '../testScreen/TestScreen';
import {FeatureA} from '../featureA/FeatureAScreen';
import {FeatureB} from '../featureB/FeatureBScreen';
import {FeatureC} from '../featureC/FeatureCScreen';
import {FetchTest} from '../testFetch/TestFetch';
import {SelectedParty} from '../pokemonCurrentParty/SelectedParty';
import {CurrentParty} from '../pokemonCurrentParty/CurrentParty';
import {SavedParties} from '../pokemonSavedParties/SavedParties';
import {PokemonSearchById} from '../pokemonSearchById/PokemonSearchById';
import {PokemonSearchInputScreen} from '../pokemonSearchInput/PokemonSearchInputScreen';

export type RootStackParamList = {
  home: undefined;
  testScreen: undefined;
  featureA: undefined;
  featureB: undefined;
  featureC: undefined;
  pokeHome: undefined;
  pokemonSearch: {pokemon: string};
  pokemonSearchInput: undefined;
  fetchTest: undefined;
  selectedParty: {partyId: string};
  currentParty: undefined;
  savedParties: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="pokeHome" component={PokeHome} />
      <Stack.Screen name="testScreen" component={TestScreen} />
      <Stack.Screen name="featureA" component={FeatureA} />
      <Stack.Screen name="featureB" component={FeatureB} />
      <Stack.Screen name="featureC" component={FeatureC} />
      <Stack.Screen name="fetchTest" component={FetchTest} />
      <Stack.Screen name="selectedParty" component={SelectedParty} />
      <Stack.Screen name="currentParty" component={CurrentParty} />
      <Stack.Screen name="savedParties" component={SavedParties} />
      <Stack.Screen
        name="pokemonSearch"
        component={PokemonSearchById}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="pokemonSearchInput"
        component={PokemonSearchInputScreen}
      />
    </Stack.Navigator>
  );
}
