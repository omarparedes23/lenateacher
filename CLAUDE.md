# Lenateacher — Доброфея

Landing page profesional para Lena (@UlyaLena), profesora nativa de ruso en Moscú.

## Stack

- **Next.js 15** con App Router
- **React 19**
- **Tailwind CSS 3** con paleta personalizada (`tailwind.config.ts`)
- **Framer Motion 11** para todas las animaciones
- **next-intl 3** para i18n ES/EN
- **next/image** para todas las imágenes
- **Deploy:** Vercel

## Comandos

```bash
npm install       # instalar dependencias (el desarrollador lo ejecuta manualmente)
npm run dev       # servidor de desarrollo
npm run build     # build de producción (debe pasar sin errores)
npm start         # producción local
```

## Estructura del proyecto

```
app/
  globals.css            # Tailwind + grain overlay CSS
  [locale]/
    layout.tsx           # Fonts, metadata, JSON-LD, NextIntlClientProvider
    page.tsx             # Orquesta todas las secciones
components/
  layout/
    Navbar.tsx           # Fixed, scroll-aware, hamburger mobile, selector ES|EN
    Footer.tsx           # Dark, grain, До встречи!
  sections/
    Hero.tsx             # Full-viewport, parallax cirílico, CTAs
    StatsStrip.tsx       # Franja wine, contadores animados
    Services.tsx         # 3 cards (Clases / RVP / Language Parties)
    Schedule.tsx         # Horarios English Club + Russian Club
    WordOfDay.tsx        # Palabra rusa aleatoria con animación flip
    Gallery.tsx          # Grid asimétrico masonry, filtro CSS editorial
    About.tsx            # 2 col, frame gold decorativo
    Testimonials.tsx     # 3 cards con comilla decorativa
    Pricing.tsx          # 3 cards, central destacada
  ui/
    TelegramFAB.tsx      # Botón flotante Telegram, aparece tras 600px scroll
i18n/
  routing.ts             # locales: ['es', 'en'], defaultLocale: 'es'
  request.ts             # carga de mensajes server-side
  navigation.ts          # createNavigation para useRouter/Link locale-aware
messages/
  es.json                # Todos los strings en español
  en.json                # Todos los strings en inglés
middleware.ts            # next-intl locale detection
```

## Reglas absolutas

- **NO Python** en ningún momento — proyecto Next.js puro
- **NO strings hardcodeados** en componentes — todo viene de `messages/es.json` o `messages/en.json`
- **Todas las imágenes** con `next/image` + `width`/`height` explícitos, o `fill` con padre de altura definida
- **Imágenes faltantes**: usar `<div className="bg-gray-200">` como placeholder
- **Solo Node.js y npm**

## Imágenes (colocar manualmente en /public/images/)

| Archivo | Descripción |
|---|---|
| `lena-portrait.jpg` | Retrato B&W profesional de Lena |
| `club-cafe-1.jpg` | Lena con alumnos latinoamericanos en cafetería |
| `club-cafe-2.jpg` | Grupo de 5 en sesión de club |
| `club-group.jpg` | Grupo de 6 personas |
| `club-outdoor.jpg` | Grupo exterior junto al río de Moscú |

Una vez colocadas, reemplazar los divs `bg-gray-200` por componentes `<Image>` de `next/image`.

## Paleta de colores

| Token | Hex |
|---|---|
| `wine` | `#6B2737` |
| `gold` | `#C9A84C` |
| `cream` | `#FAF6EF` |
| `dark` | `#1A1A1A` |
| `muted` | `#8C7B6B` |

## i18n

- Locale por defecto: **español (`es`)**
- Locale alternativo: **inglés (`en`)**
- Rutas: `/` → español, `/en` → inglés
- Selector de idioma en Navbar (toggle ES | EN)
- Detección automática del navegador via middleware

## Links sociales

- Telegram: [https://t.me/UlyaLena](https://t.me/UlyaLena)

## Efectos visuales clave

- **Grain overlay**: clase `.grain-overlay` en `globals.css` — aplicar en secciones dark/wine
- **Parallax cirílico**: `useScroll` + `useTransform` en Hero — letras Р У С С К И Й
- **Filtro editorial fotos**: `filter: saturate(0.7) sepia(0.15)` en Gallery
- **Frame decorativo foto**: doble borde gold con offset en About
- **Contadores animados**: `useMotionValue` + `useInView` en StatsStrip
