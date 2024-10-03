import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Control, FieldValues} from 'react-hook-form';
import {ObjectIter} from './utility/ObjectItter';
import {FormElement} from './test_form_element';

export function SubModuleController({
  control,
  data,
}: {
  control: Control<FieldValues, any>;
  data: Object;
}) {
  return (
    <View>
      <Text>SubModuleController</Text>
      <View>
        <FlatList
          data={ObjectIter(data)}
          keyExtractor={() => `${Math.random()}`}
          renderItem={x => {
            return <FormElement control={control} dataSet={x} />;
          }}
        />
      </View>
    </View>
  );
}
