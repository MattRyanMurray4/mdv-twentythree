import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyPokemon, Pokemon } from '@poke/api-interfaces';
import { PokemonFacade } from '@poke/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'poke-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  form: FormGroup;
  pokemons$: Observable<Pokemon[]> = this.pokemonFacade.allPokemon$;
  selectedPokemon$: Observable<Pokemon> = this.pokemonFacade.selectedPokemon$;
  constructor(
    private pokemonFacade: PokemonFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.pokemonFacade.loadPokemons();
    this.reset();
  }

  reset() {
    this.selectPokemon(emptyPokemon);
    this.form.reset();
  }

  selectPokemon(pokemon: Pokemon) {
    this.pokemonFacade.selectPokemon(pokemon.id);
    this.form.patchValue(pokemon);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonFacade.deletePokemon(pokemon);
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      base_experience: [''],
    });
  }
}
