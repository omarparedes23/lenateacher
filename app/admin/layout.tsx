import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-dark text-cream">
        <div className="grain-overlay min-h-screen">
          <div className="relative z-10">
            <header className="border-b border-cream/10 bg-dark/80 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a
                  href="/admin"
                  className="font-serif text-xl font-bold text-gold tracking-wide"
                >
                  Admin — Lena
                </a>
                <form action="/admin/logout" method="post">
                  <button
                    type="submit"
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </form>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
