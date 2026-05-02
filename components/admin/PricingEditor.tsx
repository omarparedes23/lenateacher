'use client';

interface PricingCard {
  title: string;
  price: string;
  ideal: string;
  features: string[];
  popular: boolean;
}

interface PricingData {
  subtitle: string;
  cards: PricingCard[];
}

interface Props {
  esJson: string;
  enJson: string;
  onChange: (lang: 'es' | 'en', value: string) => void;
}

function parsePricing(json: string): PricingData {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch {
    return { subtitle: '', cards: [] };
  }
}

const inputClass =
  'w-full bg-cream/5 border border-cream/20 rounded-lg px-3 py-2 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors';

function CardEditor({
  card,
  index,
  lang,
  onChange,
}: {
  card: PricingCard;
  index: number;
  lang: 'es' | 'en';
  onChange: (index: number, field: keyof PricingCard, value: string | boolean) => void;
}) {
  const langLabel = lang === 'es' ? 'ES' : 'EN';

  return (
    <div className={`border rounded-xl p-4 flex flex-col gap-3 ${card.popular ? 'border-gold/40 bg-gold/5' : 'border-cream/10'}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gold uppercase tracking-wider">
          {langLabel} — Tarjeta {index + 1}
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={card.popular}
            onChange={(e) => onChange(index, 'popular', e.target.checked)}
            className="accent-gold"
          />
          <span className="text-xs text-cream/50">Destacada</span>
        </label>
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">Título</label>
        <input
          type="text"
          value={card.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          className={inputClass}
          placeholder="Ej: Clase 1 hora"
        />
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">Precio</label>
        <input
          type="text"
          value={card.price}
          onChange={(e) => onChange(index, 'price', e.target.value)}
          className={inputClass}
          placeholder="Ej: 15 USD"
        />
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">Ideal para</label>
        <input
          type="text"
          value={card.ideal}
          onChange={(e) => onChange(index, 'ideal', e.target.value)}
          className={inputClass}
          placeholder="Ej: Ideal para: viajeros y personas ocupadas"
        />
      </div>

      <div>
        <label className="block text-xs text-cream/50 mb-1">
          Características{' '}
          <span className="text-cream/30">(una por línea)</span>
        </label>
        <textarea
          value={card.features.join('\n')}
          onChange={(e) => onChange(index, 'features', e.target.value)}
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder={'30 min de clase enfocada\nConversación o gramática\nOnline o presencial'}
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
  data: PricingData;
  onDataChange: (d: PricingData) => void;
}) {
  const langLabel = lang === 'es' ? 'ES' : 'EN';

  const handleSubtitleChange = (value: string) => {
    onDataChange({ ...data, subtitle: value });
  };

  const handleCardChange = (
    index: number,
    field: keyof PricingCard,
    value: string | boolean
  ) => {
    const updated = { ...data };
    const card = { ...updated.cards[index] };

    if (field === 'features' && typeof value === 'string') {
      card.features = value.split('\n');
    } else if (field === 'popular' && typeof value === 'boolean') {
      card.popular = value;
    } else if (typeof value === 'string') {
      (card as Record<string, unknown>)[field] = value;
    }

    updated.cards = [...updated.cards];
    updated.cards[index] = card;
    onDataChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1">
          {langLabel} — Subtítulo de sección
        </label>
        <input
          type="text"
          value={data.subtitle}
          onChange={(e) => handleSubtitleChange(e.target.value)}
          className={inputClass}
          placeholder="Ej: Escríbeme para un plan personalizado."
        />
      </div>

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

export default function PricingEditor({ esJson, enJson, onChange }: Props) {
  const esData = parsePricing(esJson);
  const enData = parsePricing(enJson);

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
