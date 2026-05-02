'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { saveSchedule, deleteSchedule } from '@/app/admin/actions';
import type { ScheduleSession } from '@/types/cms';

interface Props {
  sessions: ScheduleSession[];
}

let nextTempId = 100000;

export default function ScheduleEditor({ sessions }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ScheduleSession[]>(sessions);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toDelete, setToDelete] = useState<number[]>([]);

  const handleChange = useCallback(
    (id: number, field: keyof ScheduleSession, value: string | number) => {
      setData((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
      setSuccess('');
      setError('');
    },
    []
  );

  const handleAdd = () => {
    const newSession: ScheduleSession = {
      id: --nextTempId,
      club: 'english',
      day_es: '',
      day_en: '',
      time: '',
      location: '',
      level: 'basic',
      sort_order: data.length + 1,
    };
    setData((prev) => [...prev, newSession]);
  };

  const handleRemove = (id: number) => {
    if (id > 0) {
      setToDelete((prev) => [...prev, id]);
    }
    setData((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (toDelete.length > 0) {
        await deleteSchedule(toDelete);
        setToDelete([]);
      }
      const toSave = data.filter((s) => !toDelete.includes(s.id));
      await saveSchedule(toSave);
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
      <h1 className="font-serif text-3xl font-bold text-cream mb-2">Horarios</h1>
      <p className="text-muted mb-6">
        Edita las sesiones de English Club y Russian Club.
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
        {data.map((session, idx) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}
            className="bg-cream/5 border border-cream/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-7 gap-3 items-end"
          >
            <div>
              <label className="block text-xs text-cream/50 mb-1">Club</label>
              <select
                value={session.club}
                onChange={(e) => handleChange(session.id, 'club', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              >
                <option value="english">English</option>
                <option value="russian">Russian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-cream/50 mb-1">Día ES</label>
              <input
                type="text"
                value={session.day_es}
                onChange={(e) => handleChange(session.id, 'day_es', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs text-cream/50 mb-1">Día EN</label>
              <input
                type="text"
                value={session.day_en}
                onChange={(e) => handleChange(session.id, 'day_en', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs text-cream/50 mb-1">Hora</label>
              <input
                type="text"
                value={session.time}
                onChange={(e) => handleChange(session.id, 'time', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs text-cream/50 mb-1">Lugar</label>
              <input
                type="text"
                value={session.location}
                onChange={(e) => handleChange(session.id, 'location', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs text-cream/50 mb-1">Nivel</label>
              <select
                value={session.level}
                onChange={(e) => handleChange(session.id, 'level', e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
              >
                <option value="basic">Básico</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleRemove(session.id)}
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
          + Añadir sesión
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
