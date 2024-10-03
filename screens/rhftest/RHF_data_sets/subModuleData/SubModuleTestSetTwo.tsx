import {PricingConstants} from '../pricingConstants/PriceConstant';

export const sub_module_2_data = {
  dining_wall: {
    value: 0,
    cost: PricingConstants[0],
  },
  dining_floor: {
    value: 0,
    cost: PricingConstants[0],
  },
  dining_ceiling: {
    value: 0,
    cost: PricingConstants[0],
  },
};

export type sub_module_2_indexes =
  | 'dining_wall'
  | 'dining_floor'
  | 'dining_ceiling';

export type SubModule2Type = typeof sub_module_2_data;
