import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Pokemon } from '@poke/api-interfaces';

@Component({
  selector: 'poke-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  currentPokemon: Pokemon;
  originalName: string;

  @Input() set pokemon(value: Pokemon | null) {
    if (value) this.originalName = value.name;
    this.currentPokemon = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(pokemon: Pokemon) {
    this.saved.emit(pokemon);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
