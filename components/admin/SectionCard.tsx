import Link from 'next/link';

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
}

export default function SectionCard({ title, description, href }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-cream/5 border border-cream/10 rounded-2xl p-6 hover:border-gold/40 hover:bg-cream/[0.07] transition-all duration-200"
    >
      <h2 className="font-serif text-xl font-bold text-cream group-hover:text-gold transition-colors mb-1">
        {title}
      </h2>
      <p className="text-muted text-sm">{description}</p>
      <div className="mt-4 flex items-center text-gold text-sm font-medium">
        Editar
        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
