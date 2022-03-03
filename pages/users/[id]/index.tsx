import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Head from "next/head";
import AnimalCard from "../../../components/AnimalCard";
import TestLayout from "../../../components/Layout";

export const FETCH_USER = gql`
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

const index = () => {
  const router = useRouter();

  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  let user = data.fetchUser[0];

  return (
    <TestLayout>
      <Head>
        <title>{`${user.name}'s Profile`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex flex-col self-center">
        <div className="container flex flex-col mx-auto my-10">
          <div className="w-full flex flex-col my-5 items-center sm:items-start">
            <div className="flex w-36 h-36 rounded-full bg">
              <img
              onError={()=> "failed"}
                src={user?.image}
                alt={`${user.name}'s avatar`}
                className="rounded-full"
              />
            </div>
            <p className="text-3xl"> {user.name} </p>
          </div>
          <h3 className="text-2xl text-center sm:text-left">
            Favorited Animals
          </h3>

          <ul className="flex flex-wrap justify-center  grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {user &&
              user.favoriteAnimals.map((pet: any, key: any) => (
                <li
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
