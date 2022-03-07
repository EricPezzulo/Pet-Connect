import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ExpandableMenu = () => {
  const router = useRouter();
  const { data: session }: any = useSession();

  return (
    <div className="flex bg-gray-100 drop-shadow md:border-x border-b md:border-purple-200 h-auto w-full md:w-48 md:rounded-b-lg">
      <ul className="flex flex-col w-full font-Work-Sans">
        <button
          onClick={() => router.push(`/users/${session.id}`)}
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer text-2xl md:text-lg md:pl-0 md:justify-center border-b border-purple-200"
        >
          My Profile
        </button>
        <button
          onClick={() => router.push(`/animals/createnewlisting`)}
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer text-2xl md:text-lg md:pl-0 md:justify-center border-b border-purple-200"
        >
          Create Listing
        </button>

       <button
          className="py-2 flex pl-5 hover:bg-purple-200 hover:text-purple-800 text-gray-600 duration-150 ease-in-out hover:cursor-pointer hover:md:rounded-b-lg text-2xl md:text-lg md:pl-0 md:justify-center"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </ul>
    </div>
  );
};

export default ExpandableMenu;
