import { CoreDataModule } from '@poke/core-data';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreStateModule } from '@poke/core-state';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { MaterialModule } from '@poke/material';
import { UiLibraryModule } from '@poke/ui-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailsComponent,
    PokemonListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiLibraryModule,
    FormsModule,
    ReactiveFormsModule,
    CoreStateModule,
    CoreDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
