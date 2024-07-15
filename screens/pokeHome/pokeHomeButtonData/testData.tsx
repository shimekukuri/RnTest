import {Alert, StyleSheet, Text, View} from 'react-native';
import {pokeButton} from '../pokeHomeButtonController/PokemonHomeButtonController';
import {useState} from 'react';
import {initializeParty} from '@/features/pokemonParty/PokePartySlice';
import {dispatch} from '@/store/store';

const styles1 = StyleSheet.create({
  testData1: {
    padding: 4,
    backgroundColor: 'red',
  },
});

const testData1: pokeButton = {
  uniqueName: 'pokesearch',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('pokemonSearchInput');
  },
  element: function () {
    return (
      <View>
        <Text>Search Pokemon by name</Text>
      </View>
    );
  },
};

const testData2: pokeButton = {
  uniqueName: 'currentParty',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('currentParty');
  },
  element: function () {
    return (
      <View>
        <Text>Your Current Party</Text>
      </View>
    );
  },
};

const testData3: pokeButton = {
  uniqueName: 'savedParties',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('savedParties');
  },
  element: function () {
    return (
      <View>
        <Text>View saved parties</Text>
      </View>
    );
  },
};

const testData4: pokeButton = {
  uniqueName: 'clearCurrentParty',
  style: styles1.testData1,
  onPress: (e, n) => {
    Alert.alert('Clear Current Party Selection', '', [
      {
        text: 'cancel',
        onPress(value) {
          console.log('');
        },
      },
      {
        text: 'Remove',
        onPress() {
          dispatch(initializeParty());
        },
      },
    ]);
  },
  element: function () {
    return (
      <View>
        <Text>Clear Current Party</Text>
      </View>
    );
  },
};

const testData5: pokeButton = {
  uniqueName: 'testData1',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('featureC');
  },
  element: function () {
    const [testState, setTestState] = useState();
    return (
      <View>
        <Text>test data 3</Text>
      </View>
    );
  },
};

const testData6: pokeButton = {
  uniqueName: 'testData1',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('featureC');
  },
  element: function () {
    const [testState, setTestState] = useState();
    return (
      <View>
        <Text>test data 3</Text>
      </View>
    );
  },
};

const testData7: pokeButton = {
  uniqueName: 'testData1',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('featureC');
  },
  element: function () {
    const [testState, setTestState] = useState();
    return (
      <View>
        <Text>test data 3</Text>
      </View>
    );
  },
};

const testData8: pokeButton = {
  uniqueName: 'testData1',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('featureC');
  },
  element: function () {
    const [testState, setTestState] = useState();
    return (
      <View>
        <Text>test data 3</Text>
      </View>
    );
  },
};

const testData9: pokeButton = {
  uniqueName: 'testData1',
  style: styles1.testData1,
  onPress: (e, n) => {
    n.navigate('featureC');
  },
  element: function () {
    const [testState, setTestState] = useState();
    return (
      <View>
        <Text>test data 3</Text>
      </View>
    );
  },
};
export const testData = [
  testData1,
  testData2,
  testData3,
  testData4,
  testData5,
  testData6,
  testData7,
  testData8,
  testData9,
];
