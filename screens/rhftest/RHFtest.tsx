import React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../StackNav/Navigator';
import {MainFormController} from './RHF_data_sets/test_main_mod';

type Props = NativeStackScreenProps<RootStackParamList, 'RHFtest'>;

export function RHFtest({}: Props) {
  return (
    <View>
      <MainFormController />
    </View>
  );
}
