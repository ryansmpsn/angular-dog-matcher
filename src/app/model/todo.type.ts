export type Todo = {
  userId: number;
  completed: boolean;
  title: string;
  description?: string;
  id: number;
};

export type AddTodo = Omit<Todo, 'id'>;
export type EditTodoList = Partial<Todo> & { id: number };
