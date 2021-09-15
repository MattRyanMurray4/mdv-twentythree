import { Action } from '@ngrx/store';

import * as PokemonActions from './pokemon.actions';
import { PokemonEntity } from './pokemon.models';
import { State, initialState, reducer } from './pokemon.reducer';

describe('Pokemon Reducer', () => {
  const createPokemonEntity = (id: string, name = ''): PokemonEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Pokemon actions', () => {
    it('loadPokemonSuccess should return the list of known Pokemon', () => {
      const pokemon = [
        createPokemonEntity('PRODUCT-AAA'),
        createPokemonEntity('PRODUCT-zzz'),
      ];
      const action = PokemonActions.loadPokemonSuccess({ pokemon });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
