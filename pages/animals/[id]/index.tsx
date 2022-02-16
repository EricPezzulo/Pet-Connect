import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import ReactMapboxGl, { Feature, Layer, Marker } from "react-mapbox-gl";
import { LocationPin } from "@styled-icons/entypo/LocationPin";
import { Location } from "@styled-icons/evil/Location";
const FETCH_ANIMAL = gql`
  query FetchAnimal($animalId: String!) {
    fetchAnimal(id: $animalId) {
      id
      species
      name
      breed
      gender
      imageUrl
      city
      state
      zipCode
      streetAddress
      favoritedBy {
        name
        email
        image
      }
    }
  }
`;
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZXJpY3Blenp1bG8iLCJhIjoiY2twdHhibm9tMHNpaTJubzZ2eGd6MzVxbSJ9.SXICSGjcz4EMd3z_c1QJtA",
});

const index = () => {
  const router = useRouter();
  let animalId = router.query.id;
  const [lat, setLat] = useState(41.114538);
  const [lng, setLng] = useState(-73.428362);
  const { data, loading, error } = useQuery(FETCH_ANIMAL, {
    variables: { animalId },
  });
  let animal = data?.fetchAnimal[0];
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

  if (loading) return <p>loading</p>;
  if (error) return <p>oh no ... {error.message}</p>;

  return (
    <div className="container items-center flex flex-col mx-auto my-10">
      <Head>
        <title>{`${animal.name}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <h1 className="text-3xl font-medium">Pet Connect</h1>
      <Header />
      <div className="flex  mt-10 flex-col w-full justify-center max-w-lg rounded-lg">
        <div className="flex">
          <Image
            src={animal.imageUrl}
            alt={`${animal.name}'s avatar`}
            width={600}
            height={600}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-4 text-left">
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

      {animal.favoritedBy.length > 0 && (
        <div className="flex items-center ">
          <h3 className="text-2xl">Favorited By:</h3>
          <Image
            src={animal.favoritedBy[0].image}
            alt={`${animal.favoritedBy[0].name}'s avatar`}
            width={60}
            height={60}
            className="object-cover rounded-full"
          />
        </div>
      )}
      <p className="text-xl font-light">Where is {animal.name}?</p>
      <div className="flex items-center">
        <div className="text-blue-500 w-8">
          <Location />
        </div>
        <p className="text-lg font-light">
          {animal.streetAddress}, {animal.city}, {animal.state},{" "}
          {animal.zipCode}
        </p>
      </div>
      {lng && lat && (
        <Map
          className="rounded"
          style="mapbox://styles/mapbox/streets-v11"
          center={[lng, lat]}
          containerStyle={{
            height: "400px",
            width: "600px",
          }}
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
      )}
    </div>
  );
};

export default index;
