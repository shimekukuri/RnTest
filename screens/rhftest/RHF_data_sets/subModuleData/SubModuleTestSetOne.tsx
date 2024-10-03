export type sub_module_1_indexes =
  | 'living_wall'
  | 'living_floor'
  | 'living_ceiling';

type sub_module_inner_type = {
  costName: string;
  type: number | string;
};

type sub_module_type = {
  living_wall: sub_module_inner_type;
  living_floor: sub_module_inner_type;
  living_ceiling: sub_module_inner_type;
};

export const sub_module_1_data: sub_module_type = {
  living_wall: {
    costName: 'INTER',
    type: 'number',
  },
  living_floor: {
    costName: 'Inter',
    type: 'string',
  },
  living_ceiling: {
    costName: 'Inter',
    type: 'string',
  },
};

export type SubModule1Type = typeof sub_module_1_data;
