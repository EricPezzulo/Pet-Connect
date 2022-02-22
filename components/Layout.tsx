import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

export const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex bg-red-400">
        <Header />
      </div>
      <div className="flex flex-col flex-1">{children}</div>
      <div className="flex bg-yellow-300">
        <Footer />
      </div>
    </div>
  );
};

export const Header = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  return (
    <header className="flex sticky top-0 z-50 shadow-md px-3 bg-gray-200 w-full justify-between items-center h-16">
      <p
        className="text-2xl  cursor-pointer text-purple-900"
        onClick={() => router.push("/")}
      >
        PetConnect
      </p>

      <div className="flex items-center">
        {!session ? (
          <div>
            <button
              className=" bg-purple-600 rounded px-2 py-1 text-white"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src={`${session?.user.image}`}
                alt={`${session?.user.name}`}
                width={42}
                height={42}
                className="rounded-full hover:cursor-pointer"
                onClick={() => router.push(`/users/${session.id}`)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full border-t-2 border-purple-800 h-14 bg-purple-600">
      <p className="text-lg font-medium text-white">PetConnect &reg;</p>
    </footer>
  );
};
export default Layout;
