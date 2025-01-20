import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'secret');

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, jwtSecret);

    if (!payload || !payload.id) {
      return NextResponse.json({ error: 'Token inválido ou sem id de usuário' }, { status: 401 });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('user_id', String(payload.id));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/dashboard/:path*', '/api/auth/me'],
};
