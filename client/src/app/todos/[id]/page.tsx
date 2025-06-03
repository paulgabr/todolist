'use client'

import { useEffect, useState } from "react"
import { getTodo, updateTodo, deleteTodo } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"

export default function EditTodoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetchTodo()
  }, [])

  const fetchTodo = async () => {
    const todo = await getTodo(Number(id))
    setTitle(todo.title)
    setDescription(todo.description)
    setDone(todo.done)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateTodo(Number(id), { title, description, done: done ? 1 : 0 })
    router.push("/todos")
  }

  const handleDelete = async () => {
    await deleteTodo(Number(id))
    router.push("/todos")
  }

  return (
    <main>
      <h1>Editar Task</h1>
      <form action="" onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor="done">Concluído:</label>
          <input
            type="checkbox"
            id="done"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleDelete}>Excluir</button>
      </form>
    </main>
  )
}