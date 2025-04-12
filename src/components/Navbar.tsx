import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
        <Link href="/" className="text-3xl font-black max-sm:text-xl">
          <span className="text-primary">Pitch</span>
          <span>Nest</span>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="sm:hidden size-6" />
              </Link>
              <form action={signOutWrapper}>
                <button>
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="sm:hidden size-6 text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
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
