import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Supabase session refresh for /admin routes
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next({ request });

    // Skip Supabase if env vars are not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return response;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session — writes updated tokens to cookies if needed
    await supabase.auth.getUser();

    return response;
  }

  // Handle i18n for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/admin',
    '/admin/(.*)',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
