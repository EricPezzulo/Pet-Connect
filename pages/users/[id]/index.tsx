import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Header from "../../../components/Header";
import AnimalCard from "../../../components/AnimalCard";

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
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-medium">Pet Connect</h1>

      <Header />

      <Image
        src={user.image}
        alt={`${user.name}'s avatar`}
        width={150}
        height={150}
        className="rounded-full"
      />
      <p> {user.name} </p>
      <div>
        <h3 className="text-2xl">Favorited Animals</h3>
        <ul className="container flex flex-wrap justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {user &&
            user.favoriteAnimals.map((pet: any, key: any) => (
              <li key={key} className="m-2">
                <AnimalCard
                  name={pet.name}
                  image={pet.imageUrl}
                  weight={pet.weight}
                  color={pet.color}
                  breed={pet.breed}
                  dob={pet.dob}
                  description={pet.description}
                  id={pet.id}
                  species={pet.species}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default index;
