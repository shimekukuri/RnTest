import React from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

export function FormElement<T>({
  control,
  dataSet,
}: {
  control: Control<FieldValues, any>;
  dataSet: T;
}) {
  dataSet;
  return (
    <>
      <Controller
        name=""
        control={control}
        render={() => <BouncyCheckBox text={'meep'} />}
      />
    </>
  );
}
