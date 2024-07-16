import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import { RootStackParamList } from '../StackNav/Navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'fetchTest'>;

export function FetchTest({}: Props) {
  const [thing, setThing] = useState<string>('starting');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          setThing(() => 'FAILED');
          console.error('ERROR FETCHING:\n\n ', resp);
        }
      })
      .then(data => {
        setThing(() => 'Success');
        console.log(data);
      })
      .catch(e => {
        console.error('Catch Error: ', e);
        setThing(() => 'MAJOR FAIL');
      });
  }, []);

  return (
    <View>
      <Text>{thing}</Text>
    </View>
  );
}
