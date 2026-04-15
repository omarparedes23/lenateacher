import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Profe Lena — Profesora nativa de ruso en Moscú';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  let playfairFont: ArrayBuffer | null = null;

  try {
    const res = await fetch(
      'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff',
    );
    playfairFont = await res.arrayBuffer();
  } catch {
    // Font fetch failed — render without custom font
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#1A1A1A',
          fontFamily: playfairFont ? 'Playfair Display' : 'serif',
        }}
      >
        {/* Left section — 60% */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '720px',
            padding: '72px 64px',
          }}
        >
          {/* Gold horizontal rule */}
          <div
            style={{
              width: '80px',
              height: '3px',
              backgroundColor: '#C9A84C',
              marginBottom: '32px',
            }}
          />

          {/* Main title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#FAF6EF',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-1px',
            }}
          >
            PROFE LENA
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '24px',
              color: '#8C7B6B',
              marginBottom: 'auto',
              lineHeight: 1.4,
            }}
          >
            Profesora nativa de ruso en Moscú
          </div>

          {/* Bottom strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginTop: '48px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: '#C9A84C',
                letterSpacing: '4px',
                fontWeight: 700,
              }}
            >
              ES · EN · RU
            </div>
            <div
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: '#8C7B6B',
              }}
            />
            <div
              style={{
                fontSize: '18px',
                color: '#8C7B6B',
              }}
            >
              @UlyaLena
            </div>
          </div>
        </div>

        {/* Right section — wine panel 40% */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '480px',
            backgroundColor: '#6B2737',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative РУССКИЙ text */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: '#C9A84C',
              opacity: 0.18,
              letterSpacing: '8px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              userSelect: 'none',
            }}
          >
            РУССКИЙ
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: playfairFont
        ? [
            {
              name: 'Playfair Display',
              data: playfairFont,
              style: 'normal',
              weight: 700,
            },
          ]
        : [],
    },
  );
}
