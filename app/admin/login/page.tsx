'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="grain-overlay min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gold mb-2">
            Admin — Lena
          </h1>
          <p className="text-muted">Inicia sesión para editar el contenido</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-dark/80 border border-cream/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-wine/20 text-wine text-sm border border-wine/30">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-cream/70 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-2.5 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="lena@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-cream/70 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-2.5 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-gold text-dark font-semibold px-6 py-3 rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
