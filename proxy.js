import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');

  // Redirect non-www to www (and ensure HTTPS)
  if (host === 'klick.stream') {
    const url = request.nextUrl.clone();
    url.host = 'www.klick.stream';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  // Redirect HTTP to HTTPS
  if (proto === 'http') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
