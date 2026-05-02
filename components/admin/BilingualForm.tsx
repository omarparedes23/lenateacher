'use client';

import { ReactNode } from 'react';

interface FieldDef {
  key: string;
  label: string;
  type?: 'input' | 'textarea';
  rows?: number;
}

interface BilingualFormProps {
  fields: FieldDef[];
  esData: Record<string, string>;
  enData: Record<string, string>;
  onChange: (lang: 'es' | 'en', key: string, value: string) => void;
  children?: ReactNode;
}

export default function BilingualForm({
  fields,
  esData,
  enData,
  onChange,
  children,
}: BilingualFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {fields.map((field) => (
        <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ES */}
          <div>
            <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">
              ES — {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={esData[field.key] ?? ''}
                onChange={(e) => onChange('es', field.key, e.target.value)}
                rows={field.rows || 4}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors resize-y"
              />
            ) : (
              <input
                type="text"
                value={esData[field.key] ?? ''}
                onChange={(e) => onChange('es', field.key, e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
              />
            )}
          </div>

          {/* EN */}
          <div>
            <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-1.5">
              EN — {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={enData[field.key] ?? ''}
                onChange={(e) => onChange('en', field.key, e.target.value)}
                rows={field.rows || 4}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors resize-y"
              />
            ) : (
              <input
                type="text"
                value={enData[field.key] ?? ''}
                onChange={(e) => onChange('en', field.key, e.target.value)}
                className="w-full bg-cream/5 border border-cream/20 rounded-lg px-4 py-3 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
              />
            )}
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}
