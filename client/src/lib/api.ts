const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTodos() {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error("Falha ao buscar a lista de tarefas");
  }
  return response.json();
}

export async function getTodo(id: number) {
  const response = await fetch(`${API_URL}/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar a tarefa com id ${id}`);
  }
  return response.json();
}

export async function createTodo(todo: { title: string; description: string; done: boolean }) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Falha ao criar a tarefa");
  }
  return response.json();
}

export async function updateTodo(id: number, data: { title: string; description: string; done: boolean }) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Falha ao atualizar a tarefa com id: ${id}`);
  }
  return response.json();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Falha ao deletar a tarefa com id: ${id}`);
  }
  return response.json();
}