export type FormInputObj = {
  costName: string;
  type: FormInputObjTypeType;
  watch?: WatchFields;
};

export type FormInputObjTypeType = 'checkbox' | 'text' | 'number';

export type WatchFields = 'test0' | 'test1';
