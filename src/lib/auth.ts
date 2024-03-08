import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredientialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const config = {
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
          tenantId: userFound.tenantId,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User;
        token.id = u.id;
        token.tenantId = u.tenantId;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
