import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Allow internal Next.js and Auth API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // If not logged in, force redirect to /dashboard (login/signup page)
    if (!token && pathname !== '/dashboard') {
        const url = req.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // If logged in, prevent accessing /dashboard again
    if (token && pathname === '/dashboard') {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
