import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PokemonEffects } from './pokemon/pokemon.effects';
import { PokemonFacade } from './pokemon/pokemon.facade';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([PokemonEffects]),
    StoreDevtoolsModule.instrument({ name: 'Poke-App' }),
  ],
  providers: [PokemonFacade],
})
export class CoreStateModule {}
