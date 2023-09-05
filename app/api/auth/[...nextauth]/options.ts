import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/lib/mongo/db";
import User from "@/lib/mongo/models/User";
import bcrypt from "bcrypt";

export const options: AuthOptions = {
    providers: [
        GitHubProvider({
             clientId: process.env.GITHUB_ID as string,
             clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
             clientId: process.env.GOOGLE_CLIENT_ID as string,
             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
              name: "credentials",
              credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
              },
              async authorize(credentials) {
                 if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentilas.")
                 }

                 await db.connect();
                 const user = await User.findOne({ email: credentials.email});

                 if (!user || !user.password) {
                    throw new Error("Invalid credentilas.")
                 }

                 const isCorrectPassword = await bcrypt.compare(
                     credentials.password,
                     user.password
                 )

                 if (!isCorrectPassword) {
                    throw new Error("Invalid credentilas.")
                 }

                 return user;
              }
        }),
    ],
}

