import { NextAuthOptions } from "next-auth";
import { logoutRequest, refreshTokenRequest } from "./oidc";
import KeycloakProvider from "next-auth/providers/keycloak";
export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: Math.floor(
            Date.now() / 1000 +
              (typeof account.expires_in === "number"
                ? account.expires_in
                : 300)
          ),
        };
      }
    // Refresh if token is expired
      if (Date.now() / 1000 > token.expires_at - 60) {
        try {
          const refreshed = await refreshTokenRequest(token.refresh_token);
          return {
            ...token,
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token ?? token.refresh_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (refreshed.expires_in || 300)
            ),
          };
        } catch {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.error = token.error;
      return session;
    },
  },

  events: {
    async signOut({ token }) {
      if (token.refresh_token) {
        await logoutRequest(token.refresh_token).catch(console.error);
      }
    },
    async createUser({ user }) {
      // Example: Log user creation
      console.log('New user created:', user);

      // Example: Send a welcome email (implement sendWelcomeEmail yourself)
      // await sendWelcomeEmail(user.email, user.name);
    }
  },
};

  // Simplified types
declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    error?: string;
  }
}







