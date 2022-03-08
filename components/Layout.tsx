import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ExpandableMenu from "./ExpandableMenu";

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

let useClickAway = (handler: any) => {
  let domNode = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let maybeHandler = (e: any) => {
      if (!domNode?.current?.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", maybeHandler)
    return () => {
      document.removeEventListener("mousedown", maybeHandler)
    }
  })
  return domNode
}

export const Header = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  let domNode = useClickAway(() => { setOpenMenu(false) })

  return (
    <header className="flex sticky top-0 z-50 shadow-md px-3 bg-gray-200 w-full justify-between items-center h-16 border-b border-gray-300">
      <p
        className="text-3xl font-Titillium-Web cursor-pointer text-purple-900"
        onClick={() => router.push("/")}
      >
        PetConnect
      </p>

      <div className="flex items-center">
        {!session ? (
          <div>
            <button
              className="flex items-center justify-center py-1 hover:bg-purple-600 duration-150 rounded-lg px-3 text-purple-500 text-xl font-semibold border-2 border-purple-400 hover:border-purple-600 hover:text-white"
              onClick={() => signIn()}
            >
              <p>Login</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button 
              className="flex items-center"
              type='button'
              onClick={() => setOpenMenu((openMenu) => !openMenu)}>
              <Image
                src={`${session?.user.image}`}
                alt={`${session?.user.name}`}
                width={42}
                height={42}
                className="rounded-full hover:cursor-pointer"

              />
            </button>
            {openMenu && (
              <div ref={domNode} className="absolute w-full top-16 right-0 z-50">
                <ExpandableMenu />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full border-t-2 border-purple-800 h-14 bg-purple-600">
      <p className="text-xl font-Titillium-Web font-medium text-white">
        PetConnect
      </p>
      <p className="text-white">&reg;</p>
    </footer>
  );
};
export default Layout;
