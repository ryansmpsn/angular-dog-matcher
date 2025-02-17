import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./components/counter/counter.component').then(
        (m) => m.CounterComponent
      );
    }
  },
  {
    path: 'todos',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/todos/todos.component').then(
        (m) => m.TodosComponent
      );
    }
  }
];
