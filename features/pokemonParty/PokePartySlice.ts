import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PokemonSearchResult} from '../pokemonApi/typeDefinitions/PokemonTypes';
import uuid from 'react-native-uuid';

export interface PokemonWithConfig {
  pokemon: PokemonSearchResult;
  config: any;
  id: string;
}

export interface PokeParty {
  party: PokemonWithConfig[];
  id: string;
}

const initialState: PokeParty = {
  party: [],
  id: uuid.v4().toString(),
};

const pokemonPartySlice = createSlice({
  name: 'pokemonParty',
  initialState,
  reducers: {
    addPartyMember: (state, action: PayloadAction<PokemonSearchResult>) => {
      if (state.party.length >= 6) {
        return;
      }

      state.party.push({
        pokemon: action.payload,
        config: {},
        id: uuid.v4().toString(),
      });
    },
    removePartyMember: (state, action: PayloadAction<string>) => {
      state.party = state.party.filter(({id}) => id !== action.payload);
    },
    initializeParty: state => {
      state.party = [];
      state.id = uuid.v4().toString();
    },
    loadParty: (state, action: PayloadAction<PokeParty>) => {
      state.party = action.payload.party;
      state.id = action.payload.id;
    },
  },
});

export const {addPartyMember, removePartyMember, initializeParty, loadParty} =
  pokemonPartySlice.actions;
export const PokemonPartyReducer = pokemonPartySlice.reducer;
