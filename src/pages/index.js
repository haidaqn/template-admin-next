import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { data: session } = useSession();
    return (
        <Layout>
            <div className="flex justify-between items-center text-lg">
                <h1>Hello, {session?.user?.name}</h1>
                <div className="flex justify-center items-center gap-2 bg-gray-400 p-1 rounded-lg">
                    <h1 className="px-2">{session?.user?.email}</h1>
                    <img src={session?.user?.image} alt="avatar" className="w-10 rounded-full object-cover" />
                </div>
            </div>
        </Layout>
    );
}
