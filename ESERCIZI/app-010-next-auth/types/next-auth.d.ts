import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      // il nostro campo custom (opzionale)
      accessToken?: string;
    };
  }

  // opzionale: se vuoi che `user` nell'eventuale DB o callback abbia accessToken
  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
