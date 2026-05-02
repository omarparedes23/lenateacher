'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { saveTestimonials, deleteTestimonials } from '@/app/admin/actions';
import type { Testimonial } from '@/types/cms';

interface Props {
  testimonials: Testimonial[];
}

let nextTempId = 100000;

export default function TestimonialsEditor({ testimonials }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Testimonial[]>(testimonials);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toDelete, setToDelete] = useState<number[]>([]);

  const handleChange = useCallback(
    (id: number, field: keyof Testimonial, value: string | number) => {
      setData((prev) =>
        prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
      );
      setSuccess('');
      setError('');
    },
    []
  );

  const handleAdd = () => {
    const newItem: Testimonial = {
      id: --nextTempId,
      name: '',
      flag: '',
      country_es: '',
      country_en: '',
      text_es: '',
      text_en: '',
      sort_order: data.length + 1,
    };
    setData((prev) => [...prev, newItem]);
  };

  const handleRemove = (id: number) => {
    if (id > 0) {
      setToDelete((prev) => [...prev, id]);
    }
    setData((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      if (toDelete.length > 0) {
        await deleteTestimonials(toDelete);
        setToDelete([]);
      }
      const toSave = data.filter((t) => !toDelete.includes(t.id));
      await saveTestimonials(toSave);
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
      <h1 className="font-serif text-3xl font-bold text-cream mb-2">Testimonios</h1>
      <p className="text-muted mb-6">
        Edita las opiniones de los alumnos. Cada tarjeta se muestra en la sección correspondiente.
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

      <div className="flex flex-col gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="bg-cream/5 border border-cream/10 rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-cream/50 mb-1">Nombre</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">Bandera (emoji)</label>
                <input
                  type="text"
                  value={item.flag}
                  onChange={(e) => handleChange(item.id, 'flag', e.target.value)}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">País ES</label>
                <input
                  type="text"
                  value={item.country_es}
                  onChange={(e) => handleChange(item.id, 'country_es', e.target.value)}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">País EN</label>
                <input
                  type="text"
                  value={item.country_en}
                  onChange={(e) => handleChange(item.id, 'country_en', e.target.value)}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">Texto ES</label>
                <textarea
                  value={item.text_es}
                  onChange={(e) => handleChange(item.id, 'text_es', e.target.value)}
                  rows={3}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold resize-y"
                />
              </div>
              <div>
                <label className="block text-xs text-cream/50 mb-1">Texto EN</label>
                <textarea
                  value={item.text_en}
                  onChange={(e) => handleChange(item.id, 'text_en', e.target.value)}
                  rows={3}
                  className="w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold resize-y"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleRemove(item.id)}
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
          + Añadir testimonio
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
