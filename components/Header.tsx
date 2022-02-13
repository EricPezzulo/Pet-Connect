import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Home } from "@styled-icons/boxicons-regular/Home";
import { AdminPanelSettings } from "@styled-icons/material-outlined/AdminPanelSettings";
import { Router, useRouter } from "next/router";
const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="flex bg-gray-100 w-full justify-between items-center h-12">
      <div className="bg-blue-400 rounded-full p-1 hover:cursor-pointer">
        <div className="w-7" onClick={() => router.push("/")}>
          <Home />
        </div>
      </div>
      <div className="bg-blue-400 rounded-full p-1 hover:cursor-pointer">
        <div className="w-7">
          <AdminPanelSettings />
        </div>
      </div>

      <div className="flex items-center">
        {!session ? (
          <div>
            <button
              className=" bg-blue-600 rounded px-2 py-1 text-white"
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
                width={45}
                height={45}
                className="rounded-full hover:cursor-pointer"
                onClick={() => signOut()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
