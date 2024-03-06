import NextAuth, { NextAuthOptions } from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredientialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFound) throw new Error("Incorrect email or password");
        // if (!userFound) return null;

        const matchPassword = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Incorrect email or password");
        // if (!matchPassword) return null;

        return {
          id: userFound.id,
          name: `${userFound.firstName} ${userFound.lastName}`,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
