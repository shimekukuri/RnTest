import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PokeParty} from '../pokemonParty/PokePartySlice';
import {RootState} from '@/store/store';

export interface PokePartyStore {
  store: PokeParty[];
}

const initialState: PokePartyStore = {
  store: [],
};

const PokeStoreSlice = createSlice({
  name: 'pokeStore',
  initialState,
  reducers: {
    addParty: (state, action: PayloadAction<PokeParty>) => {
      state.store.push(action.payload);
    },
    removeParty: (state, action: PayloadAction<string>) => {
      state.store = state.store.filter(({id}) => id !== action.payload);
    },
    updateParty: (state, action: PayloadAction<PokeParty>) => {
      let notFound = true;
      let temp = state.store.map(x => {
        if (x.id === action.payload.id) {
          notFound = false;
          return action.payload;
        } else {
          return x;
        }
      });

      if (notFound) {
        state.store = [...temp, action.payload];
      } else {
        state.store = temp;
      }
    },
  },
});

export const PokeStoreReducer = PokeStoreSlice.reducer;
export const {addParty, removeParty, updateParty} = PokeStoreSlice.actions;
export const partyState = (state: RootState) => state.PokeStoreReducer.store;
