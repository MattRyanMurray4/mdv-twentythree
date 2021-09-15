import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '@poke/core-data';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  deletePokemon,
  deletePokemonFailure,
  deletePokemonSuccess,
  loadPokemons,
  loadPokemonsFailure,
  loadPokemonsSuccess,
  selectPokemon,
} from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        this.pokemonService.all().pipe(
          map((pokemons) => loadPokemonsSuccess({ pokemons })),
          catchError((error) => of(loadPokemonsFailure({ error })))
        )
      )
    )
  );

  // selectPokemon$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(selectPokemon),
  //     switchMap(({ id }) =>
  //       this.pokemonService.find(id).pipe(map((id) => selectPokemon({ id })))
  //     )
  //   )
  // );

  deletePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePokemon),
      switchMap(({ pokemon }) =>
        this.pokemonService.delete(pokemon.id).pipe(
          map((id) => deletePokemonSuccess({ id })),
          catchError((error) => of(deletePokemonFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
