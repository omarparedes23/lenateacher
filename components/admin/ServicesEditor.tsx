'use client';

interface ServiceCard {
  title: string;
  items: string[];
  footer: string | null;
}

interface ServicesData {
  cards: ServiceCard[];
}

interface Props {
  esJson: string;
  enJson: string;
  onChange: (lang: 'es' | 'en', value: string) => void;
}

function parseServices(json: string): ServicesData {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch {
    return { cards: [] };
  }
}

function CardEditor({
  card,
  index,
  lang,
  onChange,
}: {
  card: ServiceCard;
  index: number;
  lang: 'es' | 'en';
  onChange: (index: number, field: keyof ServiceCard, value: string) => void;
}) {
  const langLabel = lang === 'es' ? 'ES' : 'EN';
  const inputClass =
    'w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors';

  return (
    <div className="border border-cream/10 rounded-xl p-4 flex flex-col gap-3">
      <p className="text-xs font-bold text-gold uppercase tracking-wider">
        {langLabel} — Tarjeta {index + 1}
      </p>

      <div>
        <label className="block text-xs text-cream/50 mb-1">Título</label>
        <input
          type="text"
          value={card.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          className={inputClass}
          placeholder="Ej: Clases personalizadas"
        />
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">
          Puntos de la tarjeta{' '}
          <span className="text-cream/30">(uno por línea)</span>
        </label>
        <textarea
          value={card.items.join('\n')}
          onChange={(e) => onChange(index, 'items', e.target.value)}
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder={'Clases individuales\nPara todos los niveles\nOnline o presencial'}
        />
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">
          Pie de tarjeta{' '}
          <span className="text-cream/30">(opcional)</span>
        </label>
        <input
          type="text"
          value={card.footer ?? ''}
          onChange={(e) => onChange(index, 'footer', e.target.value)}
          className={inputClass}
          placeholder="Ej: Formatos: 30 min · 1 hora · 1.5–2 horas"
        />
      </div>
    </div>
  );
}

function LangEditor({
  lang,
  data,
  onDataChange,
}: {
  lang: 'es' | 'en';
  data: ServicesData;
  onDataChange: (d: ServicesData) => void;
}) {
  const handleCardChange = (
    index: number,
    field: keyof ServiceCard,
    value: string
  ) => {
    const updated = { ...data };
    const card = { ...updated.cards[index] };

    if (field === 'items') {
      card.items = value.split('\n');
    } else if (field === 'footer') {
      card.footer = value.trim() === '' ? null : value;
    } else {
      (card as Record<string, unknown>)[field] = value;
    }

    updated.cards = [...updated.cards];
    updated.cards[index] = card;
    onDataChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      {data.cards.map((card, i) => (
        <CardEditor
          key={i}
          card={card}
          index={i}
          lang={lang}
          onChange={handleCardChange}
        />
      ))}
    </div>
  );
}

export default function ServicesEditor({ esJson, enJson, onChange }: Props) {
  const esData = parseServices(esJson);
  const enData = parseServices(enJson);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LangEditor
        lang="es"
        data={esData}
        onDataChange={(d) => onChange('es', JSON.stringify(d))}
      />
      <LangEditor
        lang="en"
        data={enData}
        onDataChange={(d) => onChange('en', JSON.stringify(d))}
      />
    </div>
  );
}
