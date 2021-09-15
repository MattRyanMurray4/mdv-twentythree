import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as PokemonActions from './pokemon.actions';
import { PokemonEffects } from './pokemon.effects';

describe('PokemonEffects', () => {
  let actions: Observable<Action>;
  let effects: PokemonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PokemonEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PokemonEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PokemonActions.init() });

      const expected = hot('-a-|', {
        a: PokemonActions.loadPokemonSuccess({ pokemon: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
