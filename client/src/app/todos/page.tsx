'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getTodos } from '@/lib/api'
import styles from './page.module.css'

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
    <main className={styles.main}>
      <h1 className={styles.title}>Minhas Tarefas</h1>

      <Link href="/todos/create" className={styles.createLink}>
        Criar Tarefa
      </Link>

      <ul className={styles.todoList}>
        {todos.length === 0 && (
          <li className={styles.todoItem}>
            <div>
              <strong>Nenhuma tarefa encontrada</strong>
            </div>
          </li>
        )}
        {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            <div>
              <Link href={`/todos/${todo.id}`} className={styles.todoLink}>
                {todo.title}
              </Link>
            </div>
            <Link href={`/todos/${todo.id}`} className={styles.editLink}>
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}