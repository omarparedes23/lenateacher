'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { saveWords, deleteWords } from '@/app/admin/actions';
import type { WordOfDay } from '@/types/cms';

interface Props {
  words: WordOfDay[];
}

let nextTempId = 100000;

export default function WordsEditor({ words }: Props) {
  const router = useRouter();
  const [data, setData] = useState<WordOfDay[]>(words);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toDelete, setToDelete] = useState<number[]>([]);

  const handleChange = useCallback(
    (id: number, field: keyof WordOfDay, value: string | number) => {
      setData((prev) =>
        prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
      );
      setSuccess('');
      setError('');
    },
    []
  );

  const handleAdd = () => {
    const newWord: WordOfDay = {
      id: --nextTempId,
      cyrillic: '',
      phonetic: '',
      translation_es: '',
      translation_en: '',
      emoji: '',
      sort_order: data.length + 1,
    };
    setData((prev) => [...prev, newWord]);
  };

  const handleRemove = (id: number) => {
    if (id > 0) {
      setToDelete((prev) => [...prev, id]);
    }
    setData((prev) => prev.filter((w) => w.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (toDelete.length > 0) {
        await deleteWords(toDelete);
        setToDelete([]);
      }
      const toSave = data.filter((w) => !toDelete.includes(w.id));
      await saveWords(toSave);
      setSuccess('Guardado correctamente.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-cream mb-2">Palabras</h1>
      <p className="text-muted mb-6">
        Edita el pool de palabras para la sección Palabra del Día.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-wine/20 text-wine text-sm border border-wine/30">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-900/30 text-green-400 text-sm border border-green-700/30">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {data.map((word, idx) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}
            className="bg-cream/5 border border-cream/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-7 gap-3 items-end"
          >
            <div>
              <label className="block text-xs text-cream/50 mb-1">Cirílico</label>
              <input
                type="text"
                value={word.cyrillic}
                onChange={(e) => handleChange(word.id, 'cyrillic', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Fonética</label>
              <input
                type="text"
                value={word.phonetic}
                onChange={(e) => handleChange(word.id, 'phonetic', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Traducción ES</label>
              <input
                type="text"
                value={word.translation_es}
                onChange={(e) => handleChange(word.id, 'translation_es', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Traducción EN</label>
              <input
                type="text"
                value={word.translation_en}
                onChange={(e) => handleChange(word.id, 'translation_en', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Emoji</label>
              <input
                type="text"
                value={word.emoji}
                onChange={(e) => handleChange(word.id, 'emoji', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs text-cream/50 mb-1">Orden</label>
              <input
                type="number"
                value={word.sort_order}
                onChange={(e) => handleChange(word.id, 'sort_order', parseInt(e.target.value) || 0)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleRemove(word.id)}
                className="text-wine hover:text-red-400 text-sm px-3 py-2 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <a
          href="/admin"
          className="text-sm text-cream/60 hover:text-gold transition-colors border border-cream/20 rounded-full px-6 py-3"
        >
          ← Volver al menú
        </a>
        <button
          onClick={handleAdd}
          className="border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-colors duration-200 px-6 py-2.5 rounded-full text-sm font-semibold"
        >
          + Añadir palabra
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-dark font-semibold px-8 py-3 rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
