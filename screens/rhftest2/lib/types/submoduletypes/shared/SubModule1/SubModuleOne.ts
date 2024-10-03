import {FormInputObj} from '../SharedSubModuleTypes';

export type SubModule1FieldNames =
  | 'living_wall'
  | 'living_floor'
  | 'living_ceiling';

export type SubModule1Type = {
  living_wall: FormInputObj;
  living_floor: FormInputObj;
  living_ceiling: FormInputObj;
};

export const Submodule1Data: SubModule1Type = {
  living_ceiling: {
    type: 'number',
    costName: 'test0',
  },
  living_floor: {
    type: 'number',
    costName: 'test1',
  },
  living_wall: {
    type: 'number',
    costName: 'test2',
  },
};
