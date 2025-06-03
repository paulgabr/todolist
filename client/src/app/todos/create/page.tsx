'use client'

import { useState } from 'react'
import { createTodo } from '@/lib/api'
import { useRouter } from 'next/navigation'

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
    <main>
      <h1>Criar Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => router.push('/todos')}>Cancelar</button>
      </form>
    </main>
  )
}