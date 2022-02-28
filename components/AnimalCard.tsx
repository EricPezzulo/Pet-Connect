import Image from "next/image";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { useRouter } from "next/router";
import { SuitHeart } from "@styled-icons/bootstrap/SuitHeart";
import { useSession } from "next-auth/react";
import { HeartDislike } from "styled-icons/ionicons-outline";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
interface AnimalProps {
  image: string;
  breed: string;
  name: string;
  id: string;
  color: string;
  species: string;
  dob: string;
  weight: string;
  description: string;
}

const ADD_TO_FAVS = gql`
  mutation AddToFavorites($email: String!, $id: String!) {
    addToFavorites(email: $email, id: $id) {
      name
    }
  }
`;
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

const AnimalCard = ({
  image,
  breed,
  name,
  id,
  color,
  species,
  dob,
  weight,
  description,
}: AnimalProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [deleteFavorites] = useMutation(DEL_FROM_FAVS);
  const deleteFromFavs = async (id: any) => {
    await deleteFavorites({
      variables: {
        email: userEmail,
        id: id,
      },
      refetchQueries: [{ query: FETCH_USER, variables: { userId: userId } }],
    });
  };
  const addToFavs = (e: any) => {
    if (!session) {
      return alert("you need to be logged in to use this feature");
    }
    mutateFavorites({
      variables: {
        email: userEmail,
        id: id,
      },
      refetchQueries: [{ query: FETCH_USER, variables: { userId: userId } }],
    });
  };
  let userEmail = session?.user?.email;
  const [mutateFavorites] = useMutation(ADD_TO_FAVS);
  let userId = session?.id;

  const { data } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
  });
  const favoriteAnimals = data?.fetchUser[0].favoriteAnimals.map(
    (fav: any) => fav.id
  );
  // const [unfollowedMsg, setUnfollowedMsg]=useRecoilState(unfollowedMsgState)
  // const [followedMsg, setFollowedMsg]=useRecoilState(followedMsgState)

  return (
    <div className="block rounded-b-md">
      <div className="max-w-md">
        <div>
          <img
            className="flex w-full h-96 object-cover"
            src={image}
            alt={`${name}'s avatar picture`}
          />
        </div>
        <div className="group flex h-full relative rounded-b-md">
          <div className="flex flex-col">
            <p className="text-3xl font-semi-bold pt-4 pl-4 font-Work-Sans">
              {name}
            </p>

            <div className="flex p-4 border-b border-gray-100">
              <em className="line-clamp-3">"{description}"</em>
            </div>
            <div className="flex flex-col  px-4 py-2">
              <div className="flex">
                <p className="font-semibold w-16">Weight:</p>
                <p className="font-normal pl-3">{weight} lbs</p>
              </div>
              <div className="flex">
                <p className="font-semibold w-16">Color:</p>
                <p className="font-normal pl-3">{color}</p>
              </div>
              <div className="flex">
                <p className="font-semibold w-16 ">Breed:</p>
                <p className="font-normal pl-3  truncate w-52">{breed}</p>
              </div>
              <div className="flex">
                <p className="font-semibold w-16">DOB:</p>
                <p className="font-normal pl-3">{dob}</p>
              </div>
            </div>
          </div>

          {!favoriteAnimals?.includes(id) ? (
            <button
              type="button"
              className="opacity-30 group-hover:opacity-100 hover:shadow absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out"
              onClick={addToFavs}
              title={`Add ${name} to Favorites`}
            >
              {" "}
              <SuitHeart className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
            </button>
          ) : (
            <button
              type="button"
              className="opacity-30 group-hover:opacity-100 hover:shadow absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out"
              onClick={() => deleteFromFavs(id)}
              title={`Remove ${name} from Favorites`}
            >
              <HeartDislike className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
            </button>
          )}

          <button
            type="button"
            onClick={() => router.push(`/animals/${id}`)}
            className=" opacity-50 sm:opacity-0 group-hover:opacity-100 hover:shadow absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 hover:cursor-pointer duration-200 ease-in-out"
          >
            <ArrowRight className="h-8 w-8 text-gray-500 hover:text-white duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
