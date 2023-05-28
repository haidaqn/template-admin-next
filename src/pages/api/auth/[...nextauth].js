import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const adminEmails = ['haidang02032003@gmail.com'];

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        // session: ({ session, token, user }) => {
        //     if (adminEmails.includes(session?.user?.email)) {
        //         return session;
        //     } else {
        //         return false;
        //     }
        // }
    }
});

export async function isAdminRequest(req, res) {
    const session = await getServerSession(req, res);
    if (!adminEmails.includes(session?.user?.email)) {
        res.status(401);
        res.end();
        throw 'not an admin';
    }
}
