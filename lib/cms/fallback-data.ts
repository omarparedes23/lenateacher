import type { PageSection, ScheduleSession, Testimonial, WordOfDay } from '@/types/cms';

export const fallbackSections: PageSection[] = [
  {
    section_key: 'hero',
    title_es: 'Lecciones de ruso',
    title_en: 'Lessons of Russian',
    body_es: 'Clases de ruso en español e inglés',
    body_en: 'Lessons of Russian in Spanish and English',
    published: true,
    updated_at: new Date().toISOString(),
  },
  {
    section_key: 'about',
    title_es: 'Sobre Lena',
    title_en: 'About Lena',
    body_es:
      'Soy Lena, profesora nativa de ruso de Moscú. Llevo más de 6 años ayudando a extranjeros de todo el mundo a descubrir el ruso — no solo como idioma, sino como una llave a una cultura increíble. Enseño en español e inglés, con paciencia, humor y mucho café. ☕ Soy certificada por el Centro Internacional de Ruso y creadora de The Клуб, una comunidad viva de más de 80 personas que se reúnen en Moscú para practicar idiomas y hacer amigos reales.',
    body_en:
      "I'm Lena, a native Russian teacher from Moscow. For over 6 years I've been helping people from around the world discover Russian — not just as a language, but as a key to an incredible culture. I teach in Spanish and English, with patience, humor, and lots of coffee. ☕ I'm certified by the International Russian Language Centre and the creator of The Клуб, a living community of over 80 people who meet in Moscow to practice languages and make real friends.",
    published: true,
    updated_at: new Date().toISOString(),
  },
  {
    section_key: 'services',
    title_es: '¿Qué ofrezco?',
    title_en: 'What I offer',
    body_es: JSON.stringify({
      cards: [
        {
          title: 'Clases personalizadas',
          items: ['Clases', 'Trabajo, estudios, vida en Moscú', 'Para todos los niveles'],
          footer: 'Formatos: 30 min · 1 hora · 1.5–2 horas (intensivo)',
        },
        {
          title: 'Preparación RVP/VNG',
          items: ['Curso RVP/VNG', 'Preparación examen', 'Aprendizaje estructurado', 'Para todos los niveles'],
          footer: null,
        },
        {
          title: 'Live Language Parties',
          items: ['Conversation clubs', '3 Language Learning Parties', '3 idiomas para practicar', 'Grupos pequeños y dinámicos', 'Presencial en Moscú', 'Para todos los niveles'],
          footer: null,
        },
      ],
    }),
    body_en: JSON.stringify({
      cards: [
        {
          title: 'Personal Classes',
          items: ['Classes', 'Work, studies, life in Moscow', 'For all levels'],
          footer: 'Formats: 30 min · 1 hour · 1.5–2 hours (intensive)',
        },
        {
          title: 'RVP/VNG Preparation',
          items: ['RVP/VNG Course', 'Exam preparation', 'Structured learning', 'For all levels'],
          footer: null,
        },
        {
          title: 'Live Language Parties',
          items: ['Conversation clubs', '3 Language Learning Parties', '3 languages to practice', 'Small, dynamic groups', 'In-person in Moscow', 'For all levels'],
          footer: null,
        },
      ],
    }),
    published: true,
    updated_at: new Date().toISOString(),
  },
  {
    section_key: 'pricing',
    title_es: 'Inversión',
    title_en: 'Investment',
    body_es: JSON.stringify({
      subtitle: 'Escríbeme para un plan personalizado.',
      cards: [
        {
          title: 'Clase 30 min',
          price: '',
          ideal: 'Ideal para: viajeros y personas ocupadas',
          features: ['30 min de clase enfocada', 'Conversación o gramática', 'Online o presencial'],
          popular: false,
        },
        {
          title: 'Clase 1 hora',
          price: '',
          ideal: 'Ideal para: aprendizaje estructurado',
          features: ['Clase completa con estructura', 'Tarea y seguimiento', 'Online o presencial', 'Mejor relación calidad-precio'],
          popular: true,
        },
        {
          title: 'Live Language Party',
          price: '',
          ideal: 'Ideal para: práctica oral y nuevos amigos',
          features: ['Grupo pequeño y dinámico', 'Práctica de conversación real', 'Nuevos amigos en Moscú'],
          popular: false,
        },
      ],
    }),
    body_en: JSON.stringify({
      subtitle: 'Message me for a personalized plan.',
      cards: [
        {
          title: '30 min Class',
          price: '',
          ideal: 'Ideal for: travelers and busy people',
          features: ['30 min focused lesson', 'Conversation or grammar', 'Online or in-person'],
          popular: false,
        },
        {
          title: '1 hour Class',
          price: '',
          ideal: 'Ideal for: structured learning',
          features: ['Full structured lesson', 'Homework and follow-up', 'Online or in-person', 'Best value'],
          popular: true,
        },
        {
          title: 'Live Language Party',
          price: '',
          ideal: 'Ideal for: oral practice and new friends',
          features: ['Small dynamic group', 'Real conversation practice', 'New friends in Moscow'],
          popular: false,
        },
      ],
    }),
    published: true,
    updated_at: new Date().toISOString(),
  },
];

export const fallbackSchedule: ScheduleSession[] = [
  { id: 1, club: 'english', day_es: 'Martes', day_en: 'Tuesday', time: '11:00', location: 'Московский', level: 'intermediate', sort_order: 1 },
  { id: 2, club: 'english', day_es: 'Martes', day_en: 'Tuesday', time: '19:00', location: 'Московский', level: 'intermediate', sort_order: 2 },
  { id: 3, club: 'english', day_es: 'Sábado', day_en: 'Saturday', time: '11:30', location: 'Московский', level: 'basic', sort_order: 3 },
  { id: 4, club: 'english', day_es: 'Viernes', day_en: 'Friday', time: '11:30', location: 'Новаторская', level: 'intermediate', sort_order: 4 },
  { id: 5, club: 'russian', day_es: 'Miércoles', day_en: 'Wednesday', time: '13:30', location: 'Лубянка', level: 'basic', sort_order: 1 },
  { id: 6, club: 'russian', day_es: 'Viernes', day_en: 'Friday', time: '13:00', location: 'Новаторская', level: 'intermediate', sort_order: 2 },
  { id: 7, club: 'russian', day_es: 'Domingo', day_en: 'Sunday', time: '14:00', location: 'Café Metod Freida', level: 'advanced', sort_order: 3 },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos M.',
    flag: '🇨🇴',
    country_es: 'Colombia',
    country_en: 'Colombia',
    text_es: 'Empecé desde cero y en 3 meses ya podía pedir direcciones en el metro de Moscú. Lena hace que el ruso no dé miedo.',
    text_en: 'I started from scratch and in 3 months I could already ask for directions on the Moscow metro. Lena makes Russian feel less scary.',
    sort_order: 1,
  },
  {
    id: 2,
    name: 'Sarah K.',
    flag: '🇺🇸',
    country_es: 'Estados Unidos',
    country_en: 'United States',
    text_es: 'El club de conversación cambió por completo mi experiencia en Moscú. Pasé de turista a sentirme en casa.',
    text_en: 'The conversation club completely changed my experience in Moscow. I went from tourist to feeling at home.',
    sort_order: 2,
  },
  {
    id: 3,
    name: 'Ana P.',
    flag: '🇲🇽',
    country_es: 'México',
    country_en: 'México',
    text_es: 'El club me quitó el miedo a hablar. Además conocí personas increíbles de todo el mundo. ¡Totalmente recomendado!',
    text_en: 'The club took away my fear of speaking. I also met amazing people from all over the world. Totally recommended!',
    sort_order: 3,
  },
];

export const fallbackWords: WordOfDay[] = [
  { id: 1, cyrillic: 'привет', phonetic: 'pri-VET', translation_es: 'hola', translation_en: 'hello', emoji: '👋', sort_order: 1 },
  { id: 2, cyrillic: 'спасибо', phonetic: 'spa-SI-ba', translation_es: 'gracias', translation_en: 'thank you', emoji: '🙏', sort_order: 2 },
  { id: 3, cyrillic: 'пожалуйста', phonetic: 'pa-ZHAL-sta', translation_es: 'por favor', translation_en: 'please', emoji: '✨', sort_order: 3 },
  { id: 4, cyrillic: 'красивый', phonetic: 'kra-SI-viy', translation_es: 'hermoso', translation_en: 'beautiful', emoji: '😍', sort_order: 4 },
  { id: 5, cyrillic: 'душа', phonetic: 'du-SHA', translation_es: 'alma', translation_en: 'soul', emoji: '💫', sort_order: 5 },
  { id: 6, cyrillic: 'судьба', phonetic: 'sud-BA', translation_es: 'destino', translation_en: 'destiny', emoji: '🌟', sort_order: 6 },
  { id: 7, cyrillic: 'белый', phonetic: 'BE-liy', translation_es: 'blanco', translation_en: 'white', emoji: '🤍', sort_order: 7 },
  { id: 8, cyrillic: 'зима', phonetic: 'zi-MA', translation_es: 'invierno', translation_en: 'winter', emoji: '❄️', sort_order: 8 },
  { id: 9, cyrillic: 'любовь', phonetic: 'lyu-BOV', translation_es: 'amor', translation_en: 'love', emoji: '❤️', sort_order: 9 },
  { id: 10, cyrillic: 'друг', phonetic: 'DRUK', translation_es: 'amigo', translation_en: 'friend', emoji: '🤝', sort_order: 10 },
  { id: 11, cyrillic: 'Москва', phonetic: 'Mosk-VA', translation_es: 'Moscú', translation_en: 'Moscow', emoji: '🏛️', sort_order: 11 },
  { id: 12, cyrillic: 'улица', phonetic: 'U-li-tsa', translation_es: 'calle', translation_en: 'street', emoji: '🚶', sort_order: 12 },
  { id: 13, cyrillic: 'вкусно', phonetic: 'VKUS-na', translation_es: 'delicioso', translation_en: 'delicious', emoji: '😋', sort_order: 13 },
  { id: 14, cyrillic: 'интересно', phonetic: 'in-te-RES-na', translation_es: 'interesante', translation_en: 'interesting', emoji: '🤔', sort_order: 14 },
  { id: 15, cyrillic: 'конечно', phonetic: 'ka-NESH-na', translation_es: 'por supuesto', translation_en: 'of course', emoji: '👌', sort_order: 15 },
];
