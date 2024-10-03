type Merge<T extends object[]> = T[number];

export const cat_1 = {
    identifier: "",
    field_1: "",
};
export const cat_2 = {
    identifier: "",
    field_2: 2
};
export const cat_3 = {
    identifier: "",
    field_3: 3
};

type MasterObj = Merge<[typeof cat_1, typeof cat_2, typeof cat_3]>;


const yolo: MasterObj = {
    identifier: "thing",
    field_1: "thing",
    field_2: 9,
    field_3: 3
}

const test = {
    test: "thing"
}

type SuperMaster = Merge<[MasterObj, typeof test]>;

const yolo_2: SuperMaster = {
    test: "yolo"
}


