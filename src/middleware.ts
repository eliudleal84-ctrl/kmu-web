import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('admin_session');
    const { pathname } = request.nextUrl;

    // Si intentan entrar al dashboard sin sesión, redirigir a login
    if (pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Si ya tiene sesión e intenta ir a login, redirigir a dashboard
    if (pathname.startsWith('/login') && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
