import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // Qui faresti la chiamata reale all'IdP per rigenerare l'access token.
    // Questo è un esempio fittizio che "rigenera" il token aggiungendo timestamp.
    return {
      ...token,
      accessToken: `refreshed-${Date.now()}`,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // +1h
    };
  } catch (error) {
    console.error("Errore durante il refresh token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // login demo
        if (credentials?.email === "admin@test.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@test.com",
            accessToken: "initial-token-123",
            accessTokenExpires: Date.now() + 60 * 60 * 1000,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // token callback: invocata al signin e ad ogni richiesta di JWT
    async jwt({ token, user }): Promise<JWT> {
      // 1) Sign-in iniziale: copia i campi dal user al token
      if (user) {
        const u = user as any;
        token.accessToken = u.accessToken;
        token.accessTokenExpires = u.accessTokenExpires;
        return token;
      }

      // 2) Se il token non è scaduto, restituiscilo così com'è
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // 3) Altrimenti prova a fare refresh
      return await refreshAccessToken(token);
    },

    // session callback: esposto ai client components via useSession()
    async session({ session, token }) {
      // assegna il campo custom (se presente) alla sessione
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string | undefined,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
