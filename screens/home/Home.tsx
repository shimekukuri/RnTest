import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

export function Home({route, navigation}: Props) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="test" onPress={() => navigation.navigate('testScreen')} />
      <Button
        title="featureA"
        onPress={() => navigation.navigate('featureA')}
      />
      <Button
        title="featureB"
        onPress={() => navigation.navigate('featureB')}
      />
      <Button
        title="featureC"
        onPress={() => navigation.navigate('featureC')}
      />
      <Button
        title="fetchTest"
        onPress={() => navigation.navigate('fetchTest')}
      />
      <Button
        title="Pokemon Search Input"
        onPress={() => navigation.navigate('pokemonSearchInput')}
      />
      <Button
        title="pokemon home"
        onPress={() => navigation.navigate('pokeHome')}
      />
    </View>
  );
}
