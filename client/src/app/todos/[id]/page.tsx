'use client'

import { useEffect, useState } from "react"
import { getTodo, updateTodo, deleteTodo } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import styles from "./page.module.css"

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
    <main className={styles.main}>
      <h1 className={styles.title}>Editar Tarefa</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Descrição:</label>
          <textarea
            id="description"
            value={description}
            className={styles.input}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.checkboxGroup}>
          <label htmlFor="done" className={styles.labelCheckbox}>Concluído:</label>
          <input
            type="checkbox"
            id="done"
            checked={done}
            className={styles.checkbox}
            onChange={(e) => setDone(e.target.checked)}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Salvar</button>
          <button type="button" onClick={handleDelete} className={styles.button}>Excluir</button>
        </div>
      </form>
    </main>
  )
}