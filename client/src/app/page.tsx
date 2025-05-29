'use client'

import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

export default function Home() {
    
    return (
        <main className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <TodoForm  />
            <TodoList />
        </main>
    );
}
