import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {FeatureAReducer} from '../features/featureA/featureA';
import {FeatureBReducer} from '../features/featureB/featureB';
import {featureCReducer} from '../features/featureC/featureC';
import {pokemonApiSlice} from '../features/pokemonApi/pokemonApiSlice';
import {PokemonPartyReducer} from '../features/pokemonParty/PokePartySlice';
import {PokeStoreReducer} from '@/features/pokemonPartyStore/PokemonPartyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  keyPrefix: '',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  FeatureAReducer,
  FeatureBReducer,
  featureCReducer,
  PokemonPartyReducer,
  PokeStoreReducer,
  [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(pokemonApiSlice.middleware),
});

export const dispatch = store.dispatch;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
