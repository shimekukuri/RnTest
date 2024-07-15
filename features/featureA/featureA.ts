import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FeatureAState {
  value: number;
}

const initialState: FeatureAState = {
  value: 0,
};

const featureASlice = createSlice({
  name: 'featureA',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmmount} = featureASlice.actions;
export const FeatureAReducer = featureASlice.reducer;
