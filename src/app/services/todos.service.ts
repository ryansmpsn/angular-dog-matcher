import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todoItems: Todo[] = [
    {
      userId: 1,
      completed: false,
      title: 'Todo 1',
      description: 'Description 1',
      id: 1
    },
    {
      userId: 1,
      completed: false,
      title: 'Todo 2',
      description: 'Description 2',
      id: 2
    },
    {
      userId: 1,
      completed: false,
      title: 'Todo 3',
      description: 'Description 3',
      id: 3
    }
  ];

  addTodo(newTodo: Todo) {}

  constructor() {}
}
