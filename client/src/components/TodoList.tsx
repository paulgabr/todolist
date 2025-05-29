'use client'

import { useEffect, useState } from 'react';
import { getTodos } from '@/lib/api';

type Todo = {
  id: number;
  title: string;
  description: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  }

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
              {/* adicionar done */}
            </div>
            <div>
              <button onClick={() => alert(`Editing todo: ${todo.id}`)}>Edit</button>
              <button onClick={() => alert(`Deleting todo: ${todo.id}`)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}