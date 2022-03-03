import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { AnimalCat, AnimalDog } from "styled-icons/fluentui-system-regular";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { useRouter } from "next/router";
import ListButton from "../../components/ListButton";
import {EmojiSad} from "@styled-icons/entypo/EmojiSad"
import {SadCry} from "@styled-icons/fa-regular/SadCry"

const FETCH_ALL_ANIMALS = gql`
  query {
    fetchAllAnimals {
      id
      name
      weight
      species
      color
      gender
      dob
      imageUrl
      breed
      description
    }
  }
`;
export async function getServerSideProps() {
  const catRes = await axios.get(
    "https://api.thecatapi.com/v1/breeds?attach_breed=0"
  );
  let listOfCatBreeds = catRes.data.map((breeds: any) => breeds.name)
  const dogRes = await axios.get("https://dog.ceo/api/breeds/list/all");
  const data = dogRes.data.message;
  let listOfDogBreeds: any = Object.entries(data).map(
    (breed: any) => breed[0].charAt(0).toUpperCase() + breed[0].substring(1)
  );
  return {
    props: {
      listOfCatBreeds, listOfDogBreeds
    }
  }
};
interface breedProps {
  listOfCatBreeds: any,
  listOfDogBreeds:any
}

const findpet = ({listOfCatBreeds: cats, listOfDogBreeds: dogs}:breedProps) => {
  const { data: animalData } = useQuery(FETCH_ALL_ANIMALS);
  const [selectedDogAge, setSelectedDogAge] = useState("");
  const [selectedDogSize, setSelectedDogSize] = useState("");
  const [selectedDogBreed, setSelectedDogBreed] = useState("");
  const [selectedCatAge, setSelectedCatAge] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("Dog");
  const [catBreeds, setCatBreeds] = useState(cats);
  const [dogBreeds, setDogBreeds] = useState(dogs);
  const [selectedCatBreed, setSelectedCatBreed] = useState("");
  const [selectedCatSize, setSelectedCatSize] = useState("");
  const [displayDogFilteredResults, setDisplayDogFilteredResults] = useState(
    []
  );
  const [displayCatFilteredResults, setDisplayCatFilteredResults] = useState([])
  const router = useRouter();
  let catResults: any = animalData?.fetchAllAnimals.filter(
    (cat: any) => cat.species === "Cat"
  );
  let dogResults = animalData?.fetchAllAnimals.filter(
    (dog: any) => dog.species === "Dog"
  )

  useEffect(() => {
    filterDogFunc()
  }, [selectedDogAge, selectedDogBreed, selectedDogSize]);
  useEffect(() => {
    filterCatFunc()
  }, [selectedCatAge, selectedCatBreed, selectedCatSize])
  const filterDogFunc = () => {
    if (!selectedDogBreed && !selectedDogAge && !selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => dog.species === "Dog");
      setDisplayDogFilteredResults(dogs);
    }
    if (selectedDogBreed && !selectedDogAge && !selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.breed === selectedDogBreed;
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (selectedDogBreed && selectedDogAge && !selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.breed === selectedDogBreed && dog.dob === selectedDogAge;
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (selectedDogBreed && selectedDogAge && selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return (
          dog.breed === selectedDogBreed &&
          dog.dob === selectedDogAge &&
          dog.weight === selectedDogSize
        );
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (!selectedDogBreed && selectedDogAge && !selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.dob === selectedDogAge;
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (!selectedDogBreed && selectedDogAge && selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.dob === selectedDogAge && dog.weight === selectedDogSize;
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (!selectedDogBreed && !selectedDogAge && selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.weight === selectedDogSize;
      });
      setDisplayDogFilteredResults(dogs);
    }
    if (selectedDogBreed && !selectedDogAge && selectedDogSize) {
      let dogs = dogResults?.filter((dog: any) => {
        return dog.weight === selectedDogSize && dog.breed === selectedDogBreed
      });
      setDisplayDogFilteredResults(dogs);
    }
  }
  const filterCatFunc = () => {
    if (!selectedCatBreed && !selectedCatAge && !selectedCatSize) {
      let cat = catResults?.filter((cat: any) => cat.species === "Cat");
      setDisplayCatFilteredResults(cat);
    }
    if (selectedCatBreed && !selectedCatAge && !selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.breed === selectedCatBreed;
      });
      setDisplayCatFilteredResults(cats);
    }
    if (selectedCatBreed && selectedCatAge && !selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.breed === selectedCatBreed && cat.dob === selectedCatAge;
      });
      setDisplayCatFilteredResults(cats);
    }
    if (selectedCatBreed && selectedCatAge && selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return (
          cat.breed === selectedCatBreed &&
          cat.dob === selectedCatAge &&
          cat.weight === selectedCatSize
        );
      });
      setDisplayCatFilteredResults(cats);
    }
    if (!selectedCatBreed && selectedCatAge && !selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.dob === selectedCatAge;
      });
      setDisplayCatFilteredResults(cats);
    }
    if (!selectedCatBreed && selectedCatAge && selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.dob === selectedCatAge && cat.weight === selectedCatSize;
      });
      setDisplayCatFilteredResults(cats);
    }
    if (!selectedCatBreed && !selectedCatAge && selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.weight === selectedCatSize;
      });
      setDisplayCatFilteredResults(cats);
    }
    if (selectedCatBreed && !selectedCatAge && selectedCatSize) {
      let cats = catResults?.filter((cat: any) => {
        return cat.weight === selectedCatSize && cat.breed === selectedCatBreed
      });
      setDisplayCatFilteredResults(cats);
    }
  }
  const dogBreedFilter = (value: any) => {
    setSelectedDogBreed(value)
  }
  const catBreedFilter = (value: any) => {
    setSelectedCatBreed(value)
  }
  const dogAgeFilter = (value: any) => {
    setSelectedDogAge(value)
  }
  const catAgeFilter = (value: any) => {
    setSelectedCatAge(value)
  }
  const dogSizeFilter = (value: any) => {
    setSelectedDogSize(value)
  }
  const catSizeFilter = (value: any) => {
    setSelectedCatSize(value)
  }

const displayDogResults = (displayDogFilteredResults?.length === 0 || !displayDogFilteredResults) ? <div className='px-5 py-3 flex items-center'> <p className='text-xl font-light'>No Results Found&nbsp;&#128533;</p></div> :
<>
{displayDogFilteredResults != [] && (
<div className='md:shadow rounded-md w-full h-full p-2 flex flex-col items-center justify-center sm:grid sm:grid-2 md:grid-cols-2 lg:grid-cols-3'>
 {displayDogFilteredResults?.map(
  (dog: any, key: any) => {
    return (
      <div
        key={key}
        onClick={() => router.push(`/animals/${dog.id}`)}
        className="group m-2 shadow max-w-md rounded-b-lg hover:cursor-pointer hover:lg:drop-shadow-xl hover:lg:scale-105 lg:hover:relative duration-100 ease-in-out"
      >
        <div className="flex h-80 sm:h-96 md:h-44 lg:h-56 w-full">
          <img
            className="flex w-full object-cover"
            src={dog.imageUrl}
            alt={`${dog.name}'s avatar`}
          />
        </div>
        <div className="hidden group-hover:lg:block group-hover:lg:absolute bg-purple-400 bottom-16 w-full text-white duration-100 font-Titillium-Web ease-in-out ">
          <p className="text-center py-1">Size: {dog.weight}</p>
          <p className="text-center py-1">{dog.gender}</p>
        </div>

        <div className="p-2 group-hover:bg-purple-500 group-focus:bg-purple-500 duration-150 rounded-b-md group-hover:text-white">
          <p className="text-xl text-center font-Titillium-Web capitalize">
            {dog.name}
          </p>
          <p className="truncate text-center w-full font-Work-Sans capitalize">
            {dog.breed}
          </p>
        </div>
      </div>
    );
  }
)}
</div>)}
</>

const displayCatResults = (displayCatFilteredResults?.length === 0 || !displayCatFilteredResults) ? <div className='px-5 py-3 flex items-center'> <p className='text-xl font-light'>No Results Found&nbsp;&#128533;</p></div> :
<>
{displayCatFilteredResults != [] && (
<div className='shadow rounded-md w-full h-full p-2 flex flex-col items-center justify-center sm:grid sm:grid-2 md:grid-cols-2 lg:grid-cols-3'>
 {displayCatFilteredResults?.map(
  (cat: any, key: any) => {
    return (
      <div
        key={key}
        onClick={() => router.push(`/animals/${cat.id}`)}
        className="group m-2 shadow max-w-md rounded-b-lg hover:cursor-pointer hover:lg:drop-shadow-xl hover:lg:scale-105 lg:hover:relative duration-100 ease-in-out"
      >
        <div className="flex h-80 sm:h-96 md:h-44 lg:h-56 w-full">
          <img
            className="flex w-full object-cover"
            src={cat.imageUrl}
            alt={`${cat.name}'s avatar`}
          />
        </div>
        <div className="hidden group-hover:lg:block group-hover:lg:absolute bg-purple-400 bottom-16 w-full text-white duration-100 font-Titillium-Web ease-in-out ">
          <p className="text-center py-1">Size: {cat.weight}</p>
          <p className="text-center py-1">{cat.gender}</p>
        </div>

        <div className="p-2 group-hover:bg-purple-500 group-focus:bg-purple-500 duration-150 rounded-b-md group-hover:text-white">
          <p className="text-xl text-center font-Titillium-Web capitalize">
            {cat.name}
          </p>
          <p className="truncate text-center w-full font-Work-Sans capitalize">
            {cat.breed}
          </p>
        </div>
      </div>
    );
  }
)}
</div>)}
</>
  return (
    <Layout>
      <Head>
        <title>Find a pet</title>
        <meta name="description" content="Pet search results" />
      </Head>
      <div className="bg-zinc-50 flex-col flex-1 h-full">
        <div className="container flex flex-col mx-auto">
          <h1 className="text-3xl text-center md:text-left text-putple-800 my-7 text-purple-800">
            Find A Pet!
          </h1>
          <div className="flex flex-col items-center md:items-start md:flex-row">
            <div className="flex flex-col py-5 md:py-0">
              <h2 className="text-2xl md:text-xl">Filter By:</h2>{" "}
              <div className="flex flex-col w-90 shadow bg-zinc-50 p-3 rounded-md border border-purple-200 ">
                <div className="flex w-min self-center ">
                  <button
                    onClick={() => setSelectedSpecies("Dog")}
                    className={
                      selectedSpecies === "Dog"
                        ? `flex text-xl items-center bg-purple-600 w-20 rounded-xl px-2 py-1 m-1 text-white`
                        : `flex text-xl items-center bg-gray-300 w-20 rounded-xl px-2 py-1 m-1`
                    }
                  >
                    <div className="w-10">
                      <AnimalDog />
                    </div>
                    Dog
                  </button>
                  <button
                    onClick={() => setSelectedSpecies("Cat")}
                    className={
                      selectedSpecies === "Cat"
                        ? `flex text-xl items-center bg-purple-600 w-20 rounded-xl px-2 py-1 m-1 text-white`
                        : `flex text-xl items-center bg-gray-300 w-20 rounded-xl px-2 py-1 m-1`
                    }
                  >
                    <div className="w-10">
                      <AnimalCat />
                    </div>
                    Cat
                  </button>
                </div>
                <h3 className="text-lg">Breed:</h3>

                {selectedSpecies === "Dog" ? (
                  <ListButton type={selectedDogBreed} func={dogBreedFilter} data={dogBreeds} />
                ) : (
                  <ListButton type={selectedCatBreed} func={catBreedFilter} data={catBreeds} />
                )}
                <h3 className="text-lg">Age:</h3>
                <div className="relative mt-1">
                  {selectedSpecies === "Dog" ? (
                    <ListButton type={selectedDogAge} func={dogAgeFilter} data={["Puppy", "Young", "Adult", "Senior"]} />
                  ) : (
                    <ListButton type={selectedCatAge} func={catAgeFilter} data={["Kitten", "Young", "Adult", "Senior"]} />
                  )}
                </div>
                <h3 className="text-lg">Size:</h3>
                <div className="relative mt-1">
                  {selectedSpecies === "Dog" ? (
                    <ListButton type={selectedDogSize} func={dogSizeFilter} data={["Small", "Medium", "Large", "Extra Large"]} />
                  ) : (
                    <ListButton type={selectedCatSize} func={catSizeFilter} data={["Small", "Medium", "Large"]} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-5 md:mt-0 sm:mb-5 sm:ml-5">
              <h3 className="text-2xl md:text-xl text-center sm:text-left">Results</h3>
              <div className="container">
                <div className="flex rounded-md flex-col justify-center items-center w-full sm:flex">
                  {selectedSpecies === "Dog"
                    ? displayDogResults
                    : displayCatResults}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default findpet;
