import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  const signOutWrapper = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };
  const signInWrapper = async () => {
    "use server";
    await signIn("github");
  };
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-3xl font-black">
          <span className="text-primary">Pitch</span>
          <span>Nest</span>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>
              <form action={signOutWrapper}>
                <button>Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>{session?.user?.name}</Link>
            </>
          ) : (
            <form action={signInWrapper}>
              <button>Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
