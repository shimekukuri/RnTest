import {FormInputObj} from '../SharedSubModuleTypes';

export type SubModule2FieldNames =
  | 'dining_wall'
  | 'dining_floor'
  | 'dining_ceiling';

export type SubModule2Type = {
  dining_wall: FormInputObj;
  dining_floor: FormInputObj;
  dining_ceiling: FormInputObj;
};

export const Submodule2Data: SubModule2Type = {
  dining_ceiling: {
    type: 'number',
    costName: 'test0',
  },
  dining_floor: {
    type: 'number',
    costName: 'test1',
  },
  dining_wall: {
    type: 'number',
    costName: 'test2',
  },
};
