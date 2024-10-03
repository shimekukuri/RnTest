const subSection = {
  bed_wall: 1,
  bed_floor: 3,
  bed_ceiling: 2,
};

const subSection_01 = {
  living_wall: 1,
  living_floor: 0,
  living_ceiling: 1,
};

const subSection_02 = {
  dining_wall: 3,
  dining_floor: 1,
  dining_ceiling: 5,
};

export const test = {
  ...subSection,
  ...subSection_01,
  ...subSection_02,
};

type indexes =
  | 'bed_wall'
  | 'bed_floor'
  | 'bed_ceiling'
  | 'living_wall'
  | 'living_floor'
  | 'living_ceiling'
  | 'dining_wall'
  | 'dining_floor'
  | 'dining_ceiling';

type parsed_index = 'wall' | 'floor' | 'ceiling';
const check_parsed_index = ['wall', 'floor', 'ceiling'];

const new_result_form = () => {
  return {
    wall: 0,
    floor: 0,
    ceiling: 0,
  };
};

export const unsafe_parse_sub_forms = (input: typeof test) => {
  let res = new_result_form();
  let i: indexes;
  let err_arr = [];

  for (i in input) {
    let check_val = i.slice(i.indexOf('_') + 1);

    if (check_parsed_index.includes(check_val)) {
      res[check_val as unknown as parsed_index] =
        res[check_val as unknown as parsed_index] + input[i];
    } else {
      err_arr.push(input[i]);
    }
  }
  return [res, err_arr];
};
