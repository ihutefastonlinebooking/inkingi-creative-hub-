import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ensure the main pages are accessible
  const pathname = request.nextUrl.pathname

  // Allow all public routes
  if (
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/gallery') ||
    pathname.startsWith('/events') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/donate') ||
    pathname.startsWith('/join') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Fallback to home page (SPA routing support)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
