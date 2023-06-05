import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className={`bg-blue-900 w-screen h-screen flex items-center`}>
                <div className="w-full text-center">
                    <button onClick={async () => await signIn()} className="bg-white p-2 rounded-md">
                        login with google
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-blue-900 w-screen h-screen flex overflow-hidden">
            <div className="flex-1">
                <Navbar />
            </div>
            <div className="bg-white flex-4 mt-4 mr-4 mb-4 rounded-lg p-4">
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
