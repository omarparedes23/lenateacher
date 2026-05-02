import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle auth for /admin routes
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

    const { data: { user } } = await supabase.auth.getUser();
    const isLoginPage = pathname === '/admin/login';

    // Not authenticated → send to login (except if already there)
    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Authenticated → don't let them visit login again
    if (user && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

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
