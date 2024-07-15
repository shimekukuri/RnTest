import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {Home} from './screens/home/Home';
import {TestScreen} from './screens/testScreen/TestScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {FeatureA} from './screens/featureA/FeatureAScreen';
import {FeatureB} from './screens/featureB/FeatureBScreen';
import {FeatureC} from './screens/featureC/FeatureCScreen';
import {PokemonSearchById} from './screens/pokemonSearchById/PokemonSearchById';
import {PokemonSearchInputScreen} from './screens/pokemonSearchInput/PokemonSearchInputScreen';
import {FetchTest} from './screens/testFetch/TestFetch';
import {PersistGate} from 'redux-persist/integration/react';
import {PokeHome} from './screens/pokeHome/PokeHome';
import {CurrentParty} from '@/screens/pokemonCurrentParty/CurrentParty';
import {SelectedParty} from '@/screens/pokemonCurrentParty/SelectedParty';
import {SavedParties} from './screens/pokemonSavedParties/SavedParties';

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

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
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
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
