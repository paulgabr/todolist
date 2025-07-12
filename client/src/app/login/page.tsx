'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/todos');
    } else {
      const data = await res.json();
      setError(data.error || 'Erro ao fazer login');
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <h2 className={styles.title}>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <label className={styles.label} htmlFor="email">E-mail</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="password">Senha</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Entrar</button>
        <p>
          Não tem conta? <a className={styles.link} href="/register">Registre-se</a>
        </p>
      </form>
    </main>
  );
}