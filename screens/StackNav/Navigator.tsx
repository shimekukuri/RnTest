import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/home/Home';
import { PokeHome } from '@/screens/pokeHome/PokeHome';
import { TestScreen } from '@/screens/testScreen/TestScreen';
import { FeatureA } from '@/screens/featureA/FeatureAScreen';
import { FeatureB } from '@/screens/featureB/FeatureBScreen';
import { FeatureC } from '@/screens/featureC/FeatureCScreen';
import { FetchTest } from '@/screens/testFetch/TestFetch';
import { SelectedParty } from '@/screens/pokemonCurrentParty/SelectedParty';
import { CurrentParty } from '@/screens/pokemonCurrentParty/CurrentParty';
import { SavedParties } from '@/screens/pokemonSavedParties/SavedParties';
import { PokemonSearchById } from '@/screens/pokemonSearchById/PokemonSearchById';
import { PokemonSearchInputScreen } from '@/screens/pokemonSearchInput/PokemonSearchInputScreen';
import { RHFtest } from '../rhftest/RHFtest';

export type RootStackParamList = {
    home: undefined;
    testScreen: undefined;
    featureA: undefined;
    featureB: undefined;
    featureC: undefined;
    pokeHome: undefined;
    pokemonSearch: { pokemon: string };
    pokemonSearchInput: undefined;
    fetchTest: undefined;
    selectedParty: { partyId: string };
    currentParty: undefined;
    savedParties: undefined;
    RHFtest: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" options={{ title: 'Home' }} component={Home} />
            <Stack.Screen
                name="pokeHome"
                options={{ title: 'Home' }}
                component={PokeHome}
            />
            <Stack.Screen
                name="selectedParty"
                options={{ title: 'Selected Party' }}
                component={SelectedParty}
            />
            <Stack.Screen
                name="currentParty"
                options={{ title: 'Current Party' }}
                component={CurrentParty}
            />
            <Stack.Screen
                name="savedParties"
                options={{ title: 'Saved Parties' }}
                component={SavedParties}
            />
            <Stack.Screen
                name="pokemonSearch"
                options={{ presentation: 'modal', title: "Search Result" }}
                component={PokemonSearchById}
            />
            <Stack.Screen
                name="pokemonSearchInput"
                options={{ title: 'Pokemon Search' }}
                component={PokemonSearchInputScreen}
            />
            <Stack.Screen
                name="RHFtest"
                options={{ title: 'RHF test' }}
                component={RHFtest}
            />
        </Stack.Navigator>
    );
}
