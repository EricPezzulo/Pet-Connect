import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSpring,animated } from "react-spring";

const ExpandableMenu = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const fade = useSpring({ from: { opacity:0 }, opacity:1 })

  return (
    <animated.div style={fade} className="flex bg-gray-100 drop-shadow md:border-x border-b md:border-purple-200 h-auto w-full md:w-48 md:absolute md:right-0 md:rounded-bl-lg">
      <div className="flex flex-col w-full font-Work-Sans">
        <button
          type='button'
          onClick={() => router.push(`/users/${session.id}`)}
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer text-2xl md:text-lg md:pl-0 md:justify-center border-b border-purple-200"
        >
          My Profile
        </button>
        <button
          type='button'
          onClick={() => router.push(`/animals/createnewlisting`)}
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer text-2xl md:text-lg md:pl-0 md:justify-center border-b border-purple-200"
        >
          Create Listing
        </button>

       <button
          type='button'
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer hover:md:rounded-b-lg text-2xl md:text-lg md:pl-0 md:justify-center"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </animated.div>
  );
};

export default ExpandableMenu;
