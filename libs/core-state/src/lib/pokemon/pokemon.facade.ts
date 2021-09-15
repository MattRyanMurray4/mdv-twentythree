import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Pokemon } from '@poke/api-interfaces';

import * as PokemonActions from './pokemon.actions';
import * as PokemonFeature from './pokemon.reducer';
import * as PokemonSelectors from './pokemon.selectors';

@Injectable()
export class PokemonFacade {
  loaded$ = this.store.pipe(select(PokemonSelectors.getPokemonLoaded));
  allPokemon$ = this.store.pipe(select(PokemonSelectors.getAllPokemon));
  selectedPokemon$ = this.store.pipe(select(PokemonSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(PokemonActions.init());
  }

  loadPokemons() {
    return this.store.dispatch(PokemonActions.loadPokemons());
  }

  selectPokemon(id: string) {
    return this.store.dispatch(PokemonActions.selectPokemon({ id }));
  }

  deletePokemon(pokemon: Pokemon) {
    return this.store.dispatch(PokemonActions.deletePokemon({ pokemon }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
