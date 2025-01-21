"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { User } from 'next-auth';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
    const {data: session} = useSession();

    const user: User = session?.user as User;
  return (
    <nav className="p-4 md:p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link href="#" className="text-xl font-bold mb-4 md:mb-0">Mstry Message</Link>
            {
                session ? (
                    <>
                    <span className="mr-4">Welcome {user?.username}</span>
                    <Button className="w-full md:w-auto" onClick={() => signOut()}>Logout</Button>
                    </>
                ) : (<>
                    <Link href="/sign-in">
                        <Button>Login</Button>
                    </Link>
                </>)
            }
        </div>
    </nav>
  )
}
