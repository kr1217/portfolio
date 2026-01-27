import { NextResponse } from 'next/server';
import { signToken } from '@/lib/session';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    // Support both plain text (legacy/dev) and hashed (production)
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPasswordPlain = process.env.ADMIN_PASSWORD;

    let isValid = false;

    if (username === adminUsername) {
        if (adminPasswordHash) {
             const bcrypt = require('bcryptjs');
             isValid = await bcrypt.compare(password, adminPasswordHash);
        } else if (adminPasswordPlain) {
             isValid = password === adminPasswordPlain;
        }
    }

    if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ username });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
