import db from "@repo/db/client";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "demo@demo.com", required: true },
                password: { label: "Password", type: "password", placeholder: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Invalid credentials");
                }

                try {
                    const existingUser = await db.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!existingUser) {
                        throw new Error("User not found");
                    }

                    const isVerified = await bcrypt.compare(credentials.password, existingUser.password);
                    if (!isVerified) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: existingUser.id.toString(), // Cast id to string
                        email: existingUser.email,
                        name: existingUser.name,
                    };
                } catch (error: any) {
                    throw new Error(`Authorization error: ${error.message}`);
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                console.log('session', session)
                console.log('token',token)
                session.user.id = token.sub as string;
                console.log(session.user);
                
                // session.user.id = token.sub as string; // Ensure `token.sub` is a string
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    pages: {
        
    }
};
