"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  const shortToken = session?.user?.accessToken
    ? `${session.user.accessToken.slice(0, 10)}...`
    : "—";

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/">Home</Link>
      <div>
        {session ? (
          <>
            <span className="mr-4">{session.user?.email}</span>
            <span className="mr-4 text-xs opacity-75">Token: {shortToken}</span>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
