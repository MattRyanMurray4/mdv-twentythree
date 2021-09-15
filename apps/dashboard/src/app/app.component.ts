import { Component } from '@angular/core';

@Component({
  selector: 'poke-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Pokemon-App';
  links = [
    // { path: '/', icon: 'login', title: 'Login' },
    { path: 'pokemon', icon: 'info', title: 'Pokemon' },
  ];
}
