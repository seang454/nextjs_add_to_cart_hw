
const BASE_URL = `${process.env.KEYCLOAK_ISSUER}/clients-registrations/openid-connect`;

// Correct base URL for token/refresh/logout

const oidcFetch = async (endpoint: string, body: URLSearchParams) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OIDC ${endpoint} failed: ${response.status} - ${err}`);
  }

  return response.json();
};

// 🔄 Handle refresh token
export const refreshTokenRequest = (refresh_token: string) =>
  oidcFetch("/token", new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
  }));

// 🔒 Handle logout
export const logoutRequest = (refresh_token: string) =>
  oidcFetch("/logout", new URLSearchParams({
    refresh_token,
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
  }));


  
