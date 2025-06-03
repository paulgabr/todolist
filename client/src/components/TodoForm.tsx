'use client'

import { useState } from 'react';

export default function TodoForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [done, setDone] = useState(false);


    return (
        <form className="space-y-2">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={(e) => setDone(e.target.checked)}
                    className="mr-2"
                />
                Concluído
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Adicionar Tarefa
            </button>
        </form>
    );
}
