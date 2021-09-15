import { PokemonEntity } from './pokemon.models';
import {
  pokemonAdapter,
  PokemonPartialState,
  initialState,
} from './pokemon.reducer';
import * as PokemonSelectors from './pokemon.selectors';

describe('Pokemon Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPokemonId = (it: PokemonEntity) => it.id;
  const createPokemonEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PokemonEntity);

  let state: PokemonPartialState;

  beforeEach(() => {
    state = {
      pokemon: pokemonAdapter.setAll(
        [
          createPokemonEntity('PRODUCT-AAA'),
          createPokemonEntity('PRODUCT-BBB'),
          createPokemonEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Pokemon Selectors', () => {
    it('getAllPokemon() should return the list of Pokemon', () => {
      const results = PokemonSelectors.getAllPokemon(state);
      const selId = getPokemonId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PokemonSelectors.getSelected(state) as PokemonEntity;
      const selId = getPokemonId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getPokemonLoaded() should return the current "loaded" status', () => {
      const result = PokemonSelectors.getPokemonLoaded(state);

      expect(result).toBe(true);
    });

    it('getPokemonError() should return the current "error" state', () => {
      const result = PokemonSelectors.getPokemonError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
