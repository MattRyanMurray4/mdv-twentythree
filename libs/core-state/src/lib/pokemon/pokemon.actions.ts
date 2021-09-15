import { createAction, props } from '@ngrx/store';
import { Pokemon } from '@poke/api-interfaces';

export const init = createAction('[Pokemon Page] Init');

// all

export const loadPokemons = createAction('[Pokemon] Loaded all Pokemon');

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Loaded All Pokemon Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Loaded All Pokemon Failure',
  props<{ error: any }>()
);

// select

export const selectPokemon = createAction(
  '[Pokemon] Pokemon Was Selected',
  props<{ id: string }>()
);

// delete

export const deletePokemon = createAction(
  '[Pokemon] Delete A Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const deletePokemonSuccess = createAction(
  '[Pokemon] Delete A Pokemon',
  props<{ id: string }>()
);
export const deletePokemonFailure = createAction(
  '[Pokemon] Delete A Pokemon Failure',
  props<{ error: any }>()
);
