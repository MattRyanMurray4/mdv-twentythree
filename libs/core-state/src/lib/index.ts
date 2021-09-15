import { ActionReducerMap } from '@ngrx/store';
import {
  pokemonReducer,
  PokemonState,
  POKEMON_FEATURE_KEY,
} from './pokemon/pokemon.reducer';

export interface AppState {
  [POKEMON_FEATURE_KEY]: PokemonState;
}

export const reducers: ActionReducerMap<AppState> = {
  [POKEMON_FEATURE_KEY]: pokemonReducer,
};
