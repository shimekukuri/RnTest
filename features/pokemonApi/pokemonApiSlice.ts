import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Convert, PokemonSearchResult} from './typeDefinitions/PokemonTypes';

export const pokemonApiSlice = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: builder => ({
    getPokemonById: builder.query<PokemonSearchResult, string>({
      query: id => `pokemon/${id}`,
      //transformResponse: (response: any): PokemonSearchResult => {
      //  return Convert.toPokemonSearchResult(response);
      //},
    }),
    getPokemon: builder.query<any, void>({
      query: () => 'pokemon',
    }),
  }),
});

export const {useGetPokemonQuery, useGetPokemonByIdQuery} = pokemonApiSlice;
