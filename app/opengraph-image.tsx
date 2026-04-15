import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Profe Lena — Profesora nativa de ruso en Moscú';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const t = await getTranslations({ locale: 'es', namespace: 'meta' });
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6B2737 0%, #1A1A1A 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Decorative Cyrillic letters */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '40px',
            fontSize: '80px',
            color: 'rgba(201, 168, 76, 0.15)',
            fontWeight: 'bold',
            letterSpacing: '20px',
          }}
        >
          РУССКИЙ
        </div>

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: '80px',
              height: '4px',
              background: '#C9A84C',
              marginBottom: '30px',
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#FAF6EF',
              marginBottom: '16px',
              letterSpacing: '-1px',
            }}
          >
            Profe Lena
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: '#C9A84C',
              marginBottom: '24px',
              fontWeight: '500',
            }}
          >
            Profesora de Ruso en Moscú
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(250, 246, 239, 0.85)',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            Clases Online y Presenciales · Español e Inglés
          </div>

          {/* Bottom accent */}
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#C9A84C',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                fontSize: '18px',
                color: 'rgba(250, 246, 239, 0.6)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              profelena.ru
            </div>
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#C9A84C',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        {/* Decorative Cyrillic letters bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '40px',
            fontSize: '60px',
            color: 'rgba(201, 168, 76, 0.1)',
            fontWeight: 'bold',
            letterSpacing: '15px',
          }}
        >
          МОСКВА
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
