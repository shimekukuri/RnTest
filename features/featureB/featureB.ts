import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FeatureBState {
  value: string;
}

const initialState: FeatureBState = {
  value: '',
};

const featureBSlice = createSlice({
  name: 'featureB',
  initialState,
  reducers: {
    addToString: (state, action: PayloadAction<string>) => {
      state.value += action.payload;
    },
    setToInitialState: state => {
      state.value = '';
    },
  },
});

export const {addToString, setToInitialState} = featureBSlice.actions;
export const FeatureBReducer = featureBSlice.reducer;
