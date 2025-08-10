// src/app/api/auth/register/route.ts

// This is where your backend API for registering users via Keycloak should go.
import { NextResponse } from 'next/server';
import { getAdminToken, registerKeycloakUser } from '@/lib/auth/register'
import { RegisterRequest } from '@/types/userAuth';

export async function POST(req: Request) {
  const body: RegisterRequest = await req.json();
  const { username, email, password, firstName, lastName } = body;

  if (!username || !email || !password || !firstName || !lastName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const token = await getAdminToken();
    const response = await registerKeycloakUser(token, body);
    console.log('response :>> ', response);
    
    
    
    if (response.ok) {
      const location = response.headers.get('Location');
      const userId = location?.split("/").pop();

      // 4. Send verification email
      await fetch(
            `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users/${userId}/send-verify-email`,
            {
              method: "PUT",
              headers: { Authorization: `Bearer ${token}` },
            }
      );
      return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });

    } else {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
  } catch (error) {
    console.log('error :>> ', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
