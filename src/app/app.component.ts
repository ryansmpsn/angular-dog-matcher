import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-dog-matcher';
}
