import { Todo } from '../model/todo.type';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    }
  }
);

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadTodos() {
    const todos = this.storage.getItem('todos');
    return of(todos ? (JSON.parse(todos) as Todo[]) : []);
  }

  saveTodos(todos: Todo[]) {
    this.storage.setItem('todos', JSON.stringify(todos));
  }
}
