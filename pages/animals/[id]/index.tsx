import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
const FETCH_ANIMAL = gql`
  query FetchAnimal($animalId: String!) {
    fetchAnimal(id: $animalId) {
      id
      species
      name
      breed
      gender
      imageUrl
    }
  }
`;

const index = () => {
  const router = useRouter();
  let animalId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_ANIMAL, {
    variables: { animalId },
  });
  let animal = data?.fetchAnimal[0];
  if (loading) return <p>loading</p>;
  if (error) return <p>oh no ... {error.message}</p>;
  return (
    <div className="flex flex-col mx-auto items-center justify-center md:max-w-5xl md:container md:justify-start md:items-start my-20">
      <Head>
        <title>{`${animal.name}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-gray-200">
        <div className="block items-center justify-center max-w-sm rounded-lg">
          <Image
            src={animal.imageUrl}
            alt={`${animal.name}'s avatar`}
            width={450}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-5 mt-5">
          <p className="text-lg font-light">
            <span className="text-blue-500 font-medium text-lg">Name: </span>
            {animal.name}
          </p>
          <p className="text-lg font-light">
            <span className="text-blue-500 font-medium text-lg">Breed: </span>
            {animal.breed}
          </p>
          <p className="text-lg font-light">
            <span className="text-blue-500 font-medium text-lg">ID: </span>
            {animal.id}
          </p>
          <p
            className={
              animal.gender === "Male"
                ? `text-lg font-medium text-blue-500`
                : `text-pink-500`
            }
          >
            <span className="text-red-700 font-medium text-lg">Gender: </span>
            {animal.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
