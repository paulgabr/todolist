'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getTodos } from '@/lib/api'

type Todo = {
  id: number;
  title: string;
  description: string;
};

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const data = await getTodos()
    setTodos(data)
  }

  return (
    <main>
      <h1>Minhas Tasks</h1>

      <Link href="/todos/create">
        Criar Task
      </Link>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <div>
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
            </div>
            <Link href={`/todos/${todo.id}`}>
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}