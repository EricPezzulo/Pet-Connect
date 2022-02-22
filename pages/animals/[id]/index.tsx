import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMapboxGl, { Feature, Layer, Marker } from "react-mapbox-gl";
import { LocationPin } from "@styled-icons/entypo/LocationPin";
import { Location } from "@styled-icons/evil/Location";
import { SuitHeart } from "styled-icons/bootstrap";
import { HeartDislike } from "styled-icons/ionicons-outline";
import { useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../../../components/Layout";

const FETCH_ANIMAL = gql`
  query FetchAnimal($animalId: String!) {
    fetchAnimal(id: $animalId) {
      id
      species
      name
      breed
      gender
      description
      imageUrl
      city
      state
      zipCode
      streetAddress
      contactEmail
      favoritedBy {
        name
        email
        image
      }
    }
  }
`;
const SEND_EMAIL = gql`
  mutation SendEmail(
    $recipient: String!
    $emailContent: String!
    $subject: String!
  ) {
    sendEmail(
      recipient: $recipient
      emailContent: $emailContent
      subject: $subject
    ) {
      subject
      emailContent
      recipient
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
        contactEmail
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
const ADD_TO_FAVS = gql`
  mutation AddToFavorites($email: String!, $id: String!) {
    addToFavorites(email: $email, id: $id) {
      name
    }
  }
`;
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZXJpY3Blenp1bG8iLCJhIjoiY2twdHhibm9tMHNpaTJubzZ2eGd6MzVxbSJ9.SXICSGjcz4EMd3z_c1QJtA",
});

const index = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let userId = session?.id;
  let animalId = router.query.id;
  const [lat, setLat] = useState(41.114538);
  const [lng, setLng] = useState(-73.428362);

  const [deleteFavorites] = useMutation(DEL_FROM_FAVS);
  const [sendMail] = useMutation(SEND_EMAIL);
  const deleteFromFavs = async (id: any) => {
    await deleteFavorites({
      variables: {
        email: userEmail,
        id: animalId,
      },
      refetchQueries: [{ query: FETCH_USER, variables: { userId: userId } }],
    });
    alert(`You UNFAVORITED ${animal.name}!`);
  };
  const addToFavs = (e: any) => {
    if (!session) {
      return alert("you need to be loggin in to use this feature");
    }
    mutateFavorites({
      variables: {
        email: userEmail,
        id: animal.id,
      },
      refetchQueries: [{ query: FETCH_USER, variables: { userId: userId } }],
    });
    alert(`You just favorited ${animal.name} :)`);
  };
  let userEmail = session?.user?.email;
  const [mutateFavorites] = useMutation(ADD_TO_FAVS);
  const { data, loading, error } = useQuery(FETCH_ANIMAL, {
    variables: { animalId },
  });
  let animal = data?.fetchAnimal[0];
  const [newEmail, setNewEmail] = useState({
    recipient: "",
    emailContent: "",
    subject: "",
  });
  let address = animal?.streetAddress;
  let newAddr = address ? address.replace(/[^A-Z0-9]/gi, "%20") : address;
  useEffect(() => {
    const getCoordinates = async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${newAddr}%20${animal?.city}%20${animal?.state}%20${animal?.zipCode}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiZXJpY3Blenp1bG8iLCJhIjoiY2twdHhibm9tMHNpaTJubzZ2eGd6MzVxbSJ9.SXICSGjcz4EMd3z_c1QJtA`
      ).then((response) => response.json());
      setLat(res.features[0].center[1]);
      setLng(res.features[0].center[0]);
    };
    getCoordinates();
  });
  const { data: userData } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
  });
  const favoriteAnimals = userData?.fetchUser[0].favoriteAnimals.map(
    (fav: any) => fav.id
  );
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaChange = (value: any) => {
    setCaptchaValue(value);
    // console.log(value);
  };

  const submitMessage = (e: any) => {
    e.preventDefault();
    if (captchaValue) {
      if (!newEmail.emailContent) {
        return alert("please type a message");
      }
      sendMail({
        variables: {
          emailContent: newEmail.emailContent,
          subject: `Inquirey about ${animal.name}`,
          recipient: animal.contactEmail,
        },
      });
      alert(`${captchaValue} \n \n Messge: ${newEmail.emailContent}`);
      setNewEmail({ ...newEmail, emailContent: "" });
    } else {
      alert("complete captcha");
      return null;
    }
  };
  if (loading) return <p>loading</p>;
  if (error) return <p>oh no ... {error.message}</p>;
  return (
    <Layout>
      <div className="flex items-center justify-center flex-col flex-2 pb-4">
        <Head>
          <title>{`${animal.name}`}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <div className="sm:flex sm:my-10 min-h-fit container w-full">
          <div className="flex relative">
            <Image
              src={animal.imageUrl}
              alt={`${animal.name}'s avatar`}
              width={600}
              height={500}
              className="object-cover"
            />

            {!favoriteAnimals?.includes(animal.id) ? (
              <button
                type="button"
                className="opacity-50 hover:shadow absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out hover:placeholder-opacity-100"
                onClick={addToFavs}
                title={`Add ${animal.name} to Favorites`}
              >
                {" "}
                <SuitHeart className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
              </button>
            ) : (
              <button
                type="button"
                className="opacity-50 hover:opacity-100 hover:shadow absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 hover:cursor-pointer duration-200 ease-in-out"
                onClick={() => deleteFromFavs(animal)}
                title={`Remove ${animal.name} from Favorites`}
              >
                <HeartDislike className="h-7 w-7 text-gray-500 hover:text-pink-500 duration-200" />
              </button>
            )}
          </div>
          <div className="flex flex-col p-4 text-left items-start justify-center">
            <p className="text-2xl font-light">
              <span className="text-gray-700 text-2xl font-medium">Name: </span>
              {animal.name}
            </p>
            <p className="text-2xl font-light">
              <span className="text-gray-700 font-medium text-2xl">
                Breed:{" "}
              </span>
              {animal.breed}
            </p>

            <p
              className={
                animal.gender === "Male"
                  ? `text-2xl font-medium text-blue-600`
                  : `text-pink-600 text-2xl`
              }
            >
              <span className="text-gray-700 font-medium text-2xl">
                Gender:{" "}
              </span>
              {animal.gender}
            </p>
            <p className="font-light">{animal.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex sm:flex-row flex-2 w-full items-center justify-center bg-purple-100 py-5">
        <div className="flex flex-col sm:container justify-between items-center">
          <p className="text-3xl font-light pt-3">Where is {animal.name}?</p>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between  lg:justify-around w-full mb-5">
            <div>
              <p className="text-lg flex font-light pr-2 md: text:xl lg:text-2xl items-center">
                {animal.name} is located at:{" "}
              </p>
              <p className="text-lg flex font-light pr-2 md: text:xl lg:text-2xl items-center">
                <span className="text-blue-500 w-8">
                  <Location />
                </span>
                {animal.streetAddress}, {animal.city}, {animal.state},
                {animal.zipCode}
              </p>
            </div>
            {lng && lat && (
              <div className="flex flex-col items-center justify-center ">
                <Map
                  className="flex w-90 h-52 sm:w-96 sm:h-64 sm:m-2"
                  style="mapbox://styles/mapbox/streets-v11"
                  center={[lng, lat]}
                  zoom={[15]}
                >
                  <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}
                  >
                    <Feature coordinates={[lng, lat]} />
                  </Layer>
                  <Marker coordinates={[lng, lat]} anchor="bottom">
                    <div className="w-12 text-red-500">
                      <LocationPin />
                      <p className="flex w-16">{`${animal.name}'s location`}</p>
                    </div>
                  </Marker>
                </Map>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col bg-purple-400 items-center">
        <h3 className="text-white font-;light text-3xl py-5">
          Contact Us about {animal.name}
        </h3>
        <div className="flex flex-col w-full container justify-center">
          <div className="flex justify-center">
            <textarea
              className="flex rounded w-full h-28 mx-4 md:max-w-xl bg-purple-200 outline-none p-2 resize-none placeholder:text-purple-600"
              onChange={(e: any) =>
                setNewEmail({ ...newEmail, emailContent: e.target.value })
              }
              value={newEmail.emailContent}
              placeholder="Please include your contact information here."
            ></textarea>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <ReCAPTCHA
              sitekey="6LfVC4MeAAAAAPiHQZwX4e8tD39IAOLVdeantXd9"
              onChange={captchaChange}
            />
            <button
              onClick={submitMessage}
              className="rounded-md mt-4 text-white bg-purple-700 px-2 py-1"
            >
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
