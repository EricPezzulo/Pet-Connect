import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Header from "../../../components/Header";
import { useSession } from "next-auth/react";
import { HeartDislike } from "styled-icons/ionicons-outline";
import Head from "next/head";

const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(id: $userId) {
      name
      id
      image
      favoriteAnimals {
        name
        imageUrl
        description
        dob
        weight
        dob
        breed
        color
        species
        id
      }
    }
  }
`;
const DEL_FROM_FAVS = gql`
  mutation DeleteFromFavorites($email: String!, $id: String!) {
    deleteFromFavorites(email: $email, id: $id) {
      name
    }
  }
`;

const index = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });
  let userEmail = session?.user?.email;
  const [deleteFavorites] = useMutation(DEL_FROM_FAVS);
  const addToFavs = (pet: any) => {
    deleteFavorites({
      variables: {
        email: userEmail,
        id: pet.id,
      },
      refetchQueries: [{ query: FETCH_USER, variables: { userId: userId } }],
    });
  };
  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  let user = data.fetchUser[0];
  return (
    <div className="container mx-auto mt-10">
      <Head> 
      <title>{`${session?.user.name}'s Profile`}</title>
      </Head>
      <h1 className="text-3xl font-medium">Pet Connect</h1>

      <Header />

      <Image
        src={user.image}
        alt={`${user.name}'s avatar`}
        width={150}
        height={150}
        className="rounded-full"
      />
      <p className="text-xl font-light"> {user.name} </p>
      <div>
        <h3 className="text-2xl">Favorited Animals</h3>
        <ul className=" flex flex-wrap justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {user &&
            user.favoriteAnimals.map((pet: any, key: any) => (
              <li key={key} className="m-2">
                <div className="max-w-md h-auto shadow rounded-b-md bg-gradient-to-tr from-orange-300 via-red-300 to-pink-300 block">
                  <Image
                    src={pet.imageUrl}
                    alt={`${pet.name}'s avatar picture`}
                    layout="responsive"
                    width={450}
                    height={350}
                    className="object-cover"
                  />

                  <div className="group flex p-3 relative bg-white rounded-b-md">
                    <div className="flex flex-col p-2">
                      <p className="text-2xl font-medium">{pet.name}</p>

                      <div className="p-2">
                        <em className="line-clamp-3">"{pet.description}"</em>
                      </div>
                      <p className="font-semibold">
                        Weight:{" "}
                        <span className="font-normal pl-3">
                          {pet.weight} lbs
                        </span>
                      </p>
                      <p className="font-semibold">
                        Color:{" "}
                        <span className="font-normal pl-3">{pet.color}</span>
                      </p>
                      <p className="font-semibold">
                        Breed:{" "}
                        <span className="font-normal pl-3">{pet.breed}</span>
                      </p>
                      <p className="font-semibold">
                        DOB: <span className="font-normal pl-3">{pet.dob}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 hover:shadow absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out"
                      onClick={() => addToFavs(pet)}
                      title={`Unfavorite ${pet.name}`}
                    >
                      <HeartDislike className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push(`/animals/${pet.id}`)}
                      className="opacity-0 group-hover:opacity-100 hover:shadow absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 hover:cursor-pointer duration-200 ease-in-out"
                    >
                      <ArrowRight className="h-8 w-8 text-gray-500 hover:text-white duration-200" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default index;
