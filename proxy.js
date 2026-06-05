import { NextResponse } from 'next/server';

export function proxy(request) {
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');

  if (host === 'klick.stream') {
    const url = request.nextUrl.clone();
    url.host = 'www.klick.stream';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  if (proto === 'http') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
