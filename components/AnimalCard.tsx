import Image from "next/image";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { useRouter } from "next/router";
import { SuitHeart } from "@styled-icons/bootstrap/SuitHeart";
import { SuitHeartFill } from "@styled-icons/bootstrap/SuitHeartFill";
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

// const ADD_TO_FAVS = gql`
//   mutation AddToFavs{

//   }
// `

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

  const addToFavorites = () => {};
  return (
    <div>
      <div className="max-w-md shadow rounded-b-md bg-gradient-to-tr from-orange-300 via-red-300 to-pink-300 block">
        <Image
          src={image}
          alt={`${name}'s avatar picture`}
          layout="responsive"
          width={450}
          height={350}
          className="object-cover"
        />

        <div className="group flex p-3 relative bg-white rounded-b-md">
          <div className="flex flex-col p-2">
            <p className="text-2xl font-medium">{name}</p>

            <div className="p-2">
              <em className="line-clamp-3">"{description}"</em>
            </div>
            <p className="font-semibold">
              Weight: <span className="font-normal pl-3">{weight} lbs</span>
            </p>
            <p className="font-semibold">
              Color: <span className="font-normal pl-3">{color}</span>
            </p>
            <p className="font-semibold">
              Breed: <span className="font-normal pl-3">{breed}</span>
            </p>
            <p className="font-semibold">
              DOB: <span className="font-normal pl-3">{dob}</span>
            </p>
          </div>

          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 hover:shadow absolute top-2 right-2 bg-gray-100 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out"
          >
            <SuitHeart className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
          </button>
          <button
            type="button"
            onClick={() => router.push(`/animals/${id}`)}
            className="opacity-0 group-hover:opacity-100 hover:shadow absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 hover:cursor-pointer duration-200 ease-in-out"
          >
            <ArrowRight className="h-8 w-8 text-gray-500 hover:text-white duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
