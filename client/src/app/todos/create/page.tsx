'use client'

import { useState } from 'react'
import { createTodo } from '@/lib/api'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function CreateTodoPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createTodo({ title, description, done: 0 })
    router.push('/todos')
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Criar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Título:</label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Descrição:</label>
          <textarea
            id="description"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Salvar</button>
          <button type="button" onClick={() => router.push('/todos')} className={styles.button}>Cancelar</button>
        </div>
      </form>
    </main>
  )
}