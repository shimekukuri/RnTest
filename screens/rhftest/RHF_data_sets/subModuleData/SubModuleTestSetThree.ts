import { PricingConstants } from "../pricingConstants/PriceConstant";


export const sub_module_3_data = {
    bathroom_wall: {
        value: 0,
        cost: PricingConstants[0],
    },
    bathroom_floor: {
        value: 0,
        cost: PricingConstants[1],
    },
    bathroom_ceiling: {
        value: 0,
        cost: PricingConstants[2],
    },
}

export type sub_module_3_indexes =
    "bathroom_wall" |
    "bathroom_floor" |
    "bathroom_ceiling";

export type SubModule2Type = typeof sub_module_3_data;
