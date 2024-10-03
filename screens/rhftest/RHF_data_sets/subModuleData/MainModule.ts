import { sub_module_1_data } from "./SubModuleTestSetOne"
import { sub_module_2_data } from "./SubModuleTestSetTwo"
import { sub_module_3_data } from "./SubModuleTestSetThree"

export const MasterFormData = {
    ...sub_module_1_data,
    ...sub_module_2_data,
    ...sub_module_3_data
};

export type MasterFormDataType = typeof MasterFormData;
