import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
}

interface FeatureCState {
  items: Item[];
}

const initialState: FeatureCState = {
  items: [],
};

const featureCSlice = createSlice({
  name: 'featureC',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const {addItem, removeItem} = featureCSlice.actions;
export const featureCReducer = featureCSlice.reducer;
