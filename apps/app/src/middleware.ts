import authConfig from "@/lib/auth/auth.config";
import NextAuth from "next-auth";

export const { auth: middleware } = NextAuth(authConfig);
