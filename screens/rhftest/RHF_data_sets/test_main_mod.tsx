import React from 'react';
import {useForm} from 'react-hook-form';
import {SubModuleController} from './test_sub_mod';

export function MainFormController() {
  const {control, handleSubmit} = useForm();

  handleSubmit(() => console.log('tomato'));
  return (
    <>
      <SubModuleController control={control} />
      <SubModuleController control={control} />
      <SubModuleController control={control} />
    </>
  );
}
