'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setSuccess('Usuário registrado com sucesso!');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      const data = await res.json();
      setError(data.error || 'Erro ao registrar');
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <h2 className={styles.title}>Registrar</h2>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
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
        <button type="submit" className={styles.button}>Registrar</button>
        <p>
          Já tem conta? <Link className={styles.link} href="/login">Entrar</Link>
        </p>
      </form>
    </main>
  );
}