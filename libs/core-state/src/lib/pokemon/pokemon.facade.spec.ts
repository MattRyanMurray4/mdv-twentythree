import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as PokemonActions from './pokemon.actions';
import { PokemonEffects } from './pokemon.effects';
import { PokemonFacade } from './pokemon.facade';
import { PokemonEntity } from './pokemon.models';
import {
  POKEMON_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './pokemon.reducer';
import * as PokemonSelectors from './pokemon.selectors';

interface TestSchema {
  pokemon: State;
}

describe('PokemonFacade', () => {
  let facade: PokemonFacade;
  let store: Store<TestSchema>;
  const createPokemonEntity = (id: string, name = ''): PokemonEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POKEMON_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PokemonEffects]),
        ],
        providers: [PokemonFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(PokemonFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPokemon$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPokemon$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPokemonSuccess` to manually update list
     */
    it('allPokemon$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPokemon$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PokemonActions.loadPokemonSuccess({
          pokemon: [createPokemonEntity('AAA'), createPokemonEntity('BBB')],
        })
      );

      list = await readFirst(facade.allPokemon$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
