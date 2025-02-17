import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CounterComponent
  },
  {
    path: 'todos',
    pathMatch: 'full',
    // Examply of lazy loading a component. (Don't use by default! No premature optimizations!)
    loadComponent: () => {
      return import('./pages/todos/todos.component').then(
        (m) => m.TodosComponent
      );
    }
  }
];
