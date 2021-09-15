import { MaterialModule } from '@poke/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { WildComponent } from './wild/wild.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [LoginComponent, WildComponent, ToolbarComponent],
  exports: [ToolbarComponent, WildComponent, LoginComponent],
})
export class UiLibraryModule {}
