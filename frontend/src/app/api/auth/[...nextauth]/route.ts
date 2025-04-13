import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,  // make sure it's defined in .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
