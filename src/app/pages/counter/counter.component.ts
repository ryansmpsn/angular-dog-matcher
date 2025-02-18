import { Component, input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  count: WritableSignal<number> = signal(0);
  time = signal(new Date().toLocaleTimeString());
  title = input('Counter');

  keyUpHandler(event: KeyboardEvent) {
    console.log(event);
  }

  increment() {
    this.count.update((val) => val + 1);
  }

  decrement() {
    this.count.update((val) => -1);
  }

  reset() {
    this.count.set(0);
  }

  constructor() {
    setInterval(() => {
      this.time.set(new Date().toLocaleTimeString());
    }, 1000);
  }
}
