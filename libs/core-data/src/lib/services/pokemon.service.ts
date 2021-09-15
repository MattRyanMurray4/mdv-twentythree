import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environments';
import { Pokemon } from '@poke/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private model = 'pokemon';
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Pokemon[]>(this.getApi()).pipe(
      map((pokemon: any) =>
        pokemon.results.map((poke: Pokemon) => this.stripPokemonId(poke))
      ),
      // mergeMap(pokemon => (forkJoin(pokemon.map(poke => this.http.get(this.getApiById(poke.id))))))
      map((pokemon: Pokemon[]) =>
        pokemon.map((poke: Pokemon) => this.stripPokemonProperties(poke))
      )
    );
  }

  find(id: string) {
    return this.http.get<string>(this.getApiById(id));
  }

  delete(pokemonId: string) {
    return this.http
      .delete<string>(this.getApiById(pokemonId))
      .pipe(mapTo(pokemonId));
  }

  stripPokemonId(pokemon: Pokemon) {
    const pokemonId = environment.apiUrl.split('pokemon/')[1].split('/')[0];
    return { id: pokemonId };
  }

  stripPokemonProperties(pokemon: Pokemon) {
    const { id, name, url, base_experience, height, weight } = pokemon;
    const newPokemonObj = { id, name, url, base_experience, height, weight };
    return { ...newPokemonObj };
  }

  private getApi() {
    return `${environment.apiUrl}${this.model}`;
  }

  private getApiById(id: string) {
    return `${this.getApi()}/${id}`;
  }
}
