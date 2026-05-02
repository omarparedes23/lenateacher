import Link from 'next/link';
import SectionCard from '@/components/admin/SectionCard';

const sections = [
  {
    title: 'Secciones de página',
    description: 'Hero, Sobre mí, Servicios, Precios',
    href: '/admin/sections/page',
  },
  {
    title: 'Horarios',
    description: 'English Club y Russian Club',
    href: '/admin/sections/schedule',
  },
  {
    title: 'Testimonios',
    description: 'Opiniones de alumnos',
    href: '/admin/sections/testimonials',
  },
  {
    title: 'Palabras',
    description: 'Pool para Palabra del Día',
    href: '/admin/sections/words',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-cream mb-2">
        Panel de administración
      </h1>
      <p className="text-muted mb-8">
        Selecciona una sección para editar el contenido en español e inglés.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <SectionCard key={section.href} {...section} />
        ))}
      </div>
    </div>
  );
}
