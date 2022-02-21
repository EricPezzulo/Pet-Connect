import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Header from "../../../components/Header";
import { useSession } from "next-auth/react";
import { HeartDislike } from "styled-icons/ionicons-outline";
import Head from "next/head";
import { ArrowRight } from "styled-icons/bootstrap";
import { useState } from "react";
import AnimalCard from "../../../components/AnimalCard";
import TestLayout from "../../../components/Layout";

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
  const [showFavorites, setShowFavorites] = useState(false);

  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });
  let userEmail = session?.user?.email;
  const [deleteFavorites] = useMutation(DEL_FROM_FAVS);
  const deleteFromFavs = (pet: any) => {
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
    <TestLayout>
      <Head>
        <title>{`${user.name}'s Profile`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex flex-col self-center bg-blue-200">
        <div className="w-full flex justify-center items-center bg-pink-300">
          <div>
            <Image
              src={user.image}
              alt={`${user.name}'s avatar`}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <p className="text-xl font-light"> {user.name} </p>
        </div>
        <div className="flex flex-col h-auto">
          <h3 className="text-2xl">Favorited Animals</h3>

          <ul className="container self-center flex flex-wrap justify-center items-center py-5 h-full md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {user &&
              user.favoriteAnimals.map((pet: any, key: any) => (
                <li
                  id="animal-card"
                  className="flex flex-col max-w-md my-2 shadow bg-white rounded h-auto"
                  key={key}
                >
                  <AnimalCard
                    weight={pet.weight}
                    description={pet.description}
                    dob={pet.dob}
                    species={pet.species}
                    image={pet.imageUrl}
                    name={pet.name}
                    color={pet.color}
                    breed={pet.breed}
                    id={pet.id}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </TestLayout>
  );
};

export default index;
