import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AddTodo, EditTodoList, Todo } from '../model/todo.type';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

export interface TodoListState {
  todos: Todo[];
  loaded: boolean;
  error: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private storageService = inject(StorageService);
  private http = inject(HttpClient);

  // state management using signals
  private state = signal<TodoListState>({
    todos: [],
    loaded: false,
    error: null
  });

  // selectors to access the state values
  // computed values are automatically updated when the state changes
  private todosLoaded$ = this.storageService.loadTodos();
  todosList = computed(() => this.state().todos);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  add$ = new Subject<AddTodo>();
  edit$ = new Subject<EditTodoList>();
  remove$ = new Subject<number>();

  private generateId(): number {
    return this.state().todos.length > 0
      ? Math.max(...this.state().todos.map((t) => t.id)) + 1
      : 1;
  }

  getTodosFromApi(): Observable<Todo[]> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Todo[]>(url);
  }
  constructor() {
    // reducers to update the state based on actions

    this.todosLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (todos) =>
        this.state.update((state) => ({ ...state, todos, loaded: true })),
      error: (error) => this.state.update((state) => ({ ...state, error }))
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((todo) => {
      this.state.update((state) => ({
        ...state,
        todos: [...state.todos, { ...todo, id: this.generateId() }]
      }));
    });

    this.edit$.pipe(takeUntilDestroyed()).subscribe((todo) => {
      this.state.update((state) => ({
        ...state,
        todos: state.todos.map((t) =>
          t.id === todo.id ? { ...t, ...todo } : t
        )
      }));
    });

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.state.update((state) => ({
        ...state,
        todos: state.todos.filter((t) => t.id !== id)
      }));
    });

    effect(() => {
      if (this.loaded()) {
        this.storageService.saveTodos([]);
      }
    });
  }
}
