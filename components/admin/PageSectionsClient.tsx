'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BilingualForm from '@/components/admin/BilingualForm';
import ServicesEditor from '@/components/admin/ServicesEditor';
import PricingEditor from '@/components/admin/PricingEditor';
import PreviewModal from '@/components/admin/PreviewModal';
import { savePageSections } from '@/app/admin/actions';
import type { PageSection } from '@/types/cms';

interface Props {
  sections: PageSection[];
}

const sectionLabels: Record<string, { title: string; desc: string }> = {
  hero: { title: 'Hero', desc: 'Título y subtítulo de la portada' },
  about: { title: 'Sobre mí', desc: 'Título y biografía' },
  services: { title: 'Servicios', desc: 'Título y tarjetas de servicios' },
  pricing: { title: 'Precios', desc: 'Tarjetas de precios e inversión' },
};

const sectionFields: Record<string, { key: string; label: string; type: 'input' | 'textarea'; rows?: number }[]> = {
  hero: [
    { key: 'title', label: 'Título', type: 'input' },
    { key: 'body', label: 'Subtítulo', type: 'textarea', rows: 2 },
  ],
  about: [
    { key: 'title', label: 'Título', type: 'input' },
    { key: 'body', label: 'Biografía', type: 'textarea', rows: 6 },
  ],
  services: [
    { key: 'title', label: 'Título de sección', type: 'input' },
  ],
  pricing: [
    { key: 'title', label: 'Título de sección', type: 'input' },
  ],
};

export default function PageSectionsEditor({ sections }: Props) {
  const router = useRouter();
  const [data, setData] = useState<PageSection[]>(sections);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewKey, setPreviewKey] = useState<string | null>(null);

  const handleChange = useCallback(
    (sectionKey: string, lang: 'es' | 'en', field: string, value: string) => {
      setData((prev) =>
        prev.map((s) =>
          s.section_key === sectionKey
            ? { ...s, [`${field}_${lang}`]: value }
            : s
        )
      );
      setSuccess('');
      setError('');
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await savePageSections(data);
      setSuccess('Guardado correctamente. La página se actualizará en breve.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-cream mb-2">
        Secciones de página
      </h1>
      <p className="text-muted mb-6">
        Edita el contenido principal de cada sección. Guarda para publicar los cambios.
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

      <div className="flex flex-col gap-8">
        {data.map((section) => {
          const label = sectionLabels[section.section_key];
          const fields = sectionFields[section.section_key];
          if (!label || !fields) return null;

          const esData: Record<string, string> = {};
          const enData: Record<string, string> = {};
          for (const f of fields) {
            esData[f.key] = section[`${f.key}_es` as keyof PageSection] as string;
            enData[f.key] = section[`${f.key}_en` as keyof PageSection] as string;
          }

          return (
            <motion.div
              key={section.section_key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-cream/5 border border-cream/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-gold">
                    {label.title}
                  </h2>
                  <p className="text-muted text-sm">{label.desc}</p>
                </div>
                <button
                  onClick={() => setPreviewKey(section.section_key)}
                  className="text-sm text-cream/60 hover:text-gold transition-colors border border-cream/20 rounded-lg px-3 py-1.5"
                >
                  Preview
                </button>
              </div>

              {section.section_key === 'services' ? (
                <>
                  {/* Title field */}
                  <BilingualForm
                    fields={[{ key: 'title', label: 'Título de sección', type: 'input' }]}
                    esData={esData}
                    enData={enData}
                    onChange={(lang, key, value) =>
                      handleChange(section.section_key, lang, key, value)
                    }
                  />
                  <div className="mt-4">
                    <ServicesEditor
                      esJson={section.body_es}
                      enJson={section.body_en}
                      onChange={(lang, value) =>
                        handleChange(section.section_key, lang, 'body', value)
                      }
                    />
                  </div>
                </>
              ) : section.section_key === 'pricing' ? (
                <>
                  {/* Title field */}
                  <BilingualForm
                    fields={[{ key: 'title', label: 'Título de sección', type: 'input' }]}
                    esData={esData}
                    enData={enData}
                    onChange={(lang, key, value) =>
                      handleChange(section.section_key, lang, key, value)
                    }
                  />
                  <div className="mt-4">
                    <PricingEditor
                      esJson={section.body_es}
                      enJson={section.body_en}
                      onChange={(lang, value) =>
                        handleChange(section.section_key, lang, 'body', value)
                      }
                    />
                  </div>
                </>
              ) : (
                <BilingualForm
                  fields={fields}
                  esData={esData}
                  enData={enData}
                  onChange={(lang, key, value) =>
                    handleChange(section.section_key, lang, key, value)
                  }
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <a
          href="/admin"
          className="text-sm text-cream/60 hover:text-gold transition-colors border border-cream/20 rounded-full px-6 py-3"
        >
          ← Volver al menú
        </a>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-dark font-semibold px-8 py-3 rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={!!previewKey}
        onClose={() => setPreviewKey(null)}
        title={`Preview: ${previewKey ? sectionLabels[previewKey]?.title : ''}`}
      >
        {previewKey && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gold uppercase mb-1">ES</p>
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4 text-cream/80 text-sm whitespace-pre-wrap">
                {data.find((s) => s.section_key === previewKey)?.title_es}
                {'\n\n'}
                {data.find((s) => s.section_key === previewKey)?.body_es}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gold uppercase mb-1">EN</p>
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4 text-cream/80 text-sm whitespace-pre-wrap">
                {data.find((s) => s.section_key === previewKey)?.title_en}
                {'\n\n'}
                {data.find((s) => s.section_key === previewKey)?.body_en}
              </div>
            </div>
          </div>
        )}
      </PreviewModal>
    </div>
  );
}
