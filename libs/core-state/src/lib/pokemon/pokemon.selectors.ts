import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyPokemon, Pokemon } from '@poke/api-interfaces';
import {
  POKEMON_FEATURE_KEY,
  PokemonState,
  pokemonAdapter,
} from './pokemon.reducer';

// Lookup the 'Pokemon' feature state managed by NgRx
export const getPokemonState =
  createFeatureSelector<PokemonState>(POKEMON_FEATURE_KEY);

const { selectAll, selectEntities } = pokemonAdapter.getSelectors();

export const getPokemonLoaded = createSelector(
  getPokemonState,
  (state: PokemonState) => state.loaded
);

export const getPokemonError = createSelector(
  getPokemonState,
  (state: PokemonState) => state.error
);

export const getAllPokemon = createSelector(
  getPokemonState,
  (state: PokemonState) => selectAll(state)
);

export const getPokemonEntities = createSelector(
  getPokemonState,
  (state: PokemonState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPokemonState,
  (state: PokemonState) => state.selectedId
);

export const getSelected = createSelector(
  getPokemonEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyPokemon) as Pokemon
);
