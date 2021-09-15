import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Pokemon } from '@poke/api-interfaces';
import * as PokemonActions from './pokemon.actions';

export const POKEMON_FEATURE_KEY = 'pokemon';

export interface PokemonAction extends Action {
  error: string;
}

export interface PokemonState extends EntityState<Pokemon> {
  selectedId?: string | number; // which Pokemon record has been selected
  loaded: boolean; // has the Pokemon list been loaded
  error?: string | null; // last known error (if any)
}

export interface PokemonPartialState {
  readonly [POKEMON_FEATURE_KEY]: PokemonState;
}

export const pokemonAdapter: EntityAdapter<Pokemon> =
  createEntityAdapter<Pokemon>();

export const initialState: PokemonState = pokemonAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: PokemonState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: PokemonState, { error }: PokemonAction) => ({
  ...state,
  error,
});

const _pokemonReducer = createReducer(
  initialState,
  on(
    PokemonActions.loadPokemons,
    PokemonActions.selectPokemon,
    PokemonActions.deletePokemon,
    setLoading
  ),
  on(
    PokemonActions.loadPokemonsFailure,
    PokemonActions.deletePokemonFailure,
    setFailure
  ),
  on(PokemonActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons }) =>
    pokemonAdapter.setAll(pokemons, { ...state, loaded: true })
  ),
  on(PokemonActions.loadPokemonsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PokemonActions.selectPokemon, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(PokemonActions.deletePokemonSuccess, (state, { id }) =>
    pokemonAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function pokemonReducer(
  state: PokemonState | undefined,
  action: Action
) {
  return _pokemonReducer(state, action);
}
