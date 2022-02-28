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
const findpet = () => {
  const [selectedAge, setSelectedAge] = useState("Puppy");
  const [selectedCatAge, setSelectedCatAge] = useState("Kitten");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedSpecies, setSelectedSpecies] = useState("Dog");
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedCatBreed, setSelectedCatBreed] = useState("");
  const [selectedDogBreed, setSelectedDogBreed] = useState("Affenpinscher");
  const [selectedCatSize, setSelectedCatSize] = useState("Small");
  const router = useRouter();
  useEffect(() => {
    const fetchCatBreeds = async () => {
      const res: any = await axios.get(
        "https://api.thecatapi.com/v1/breeds?attach_breed=0"
      );
      setCatBreeds(res.data.map((breeds: any) => breeds.name));
      setSelectedCatBreed(res.data[0].name);
    };
    const fetchDogBreeds = async () => {
      const res: any = await axios.get("https://dog.ceo/api/breeds/list/all");
      const data: any = res.data.message;
      setDogBreeds(
        Object.entries(data).map(
          (breed) => breed[0].charAt(0).toUpperCase() + breed[0].substring(1)
        )
      );
    };
    fetchDogBreeds();
    fetchCatBreeds();
  }, []);
  const {
    data: animalData,
    loading: animalLoading,
    error: animalError,
  } = useQuery(FETCH_ALL_ANIMALS);
  const catResults: string[] = animalData?.fetchAllAnimals.filter(
    (cat: any) => cat.species === "Cat"
  );
  const dogResults: string[] = animalData?.fetchAllAnimals.filter(
    (dog: any) => dog.species === "Dog"
  );
  console.log(dogResults);
  // console.log(catResults);

  const displayDogResults = dogResults?.map((dog: any, key: any) => {
    return (
      <div
        key={key}
        onClick={() => router.push(`/animals/${dog.id}`)}
        className="group m-2 shadow w-44 rounded-md hover:cursor-pointer"
      >
        <div className="flex h-36 w-44">
          <img
            className="flex w-full object-cover"
            src={dog.imageUrl}
            alt={`${dog.name}'s avatar`}
          />
        </div>
        <div className="p-2 group-hover:bg-purple-500 duration-150 rounded-b-md group-hover:text-white">
          <p className="text-xl text-center font-Titillium-Web capitalize">
            {dog.name}
          </p>
          <p className="truncate text-center w-full font-Work-Sans capitalize">
            {dog.breed}
          </p>
        </div>
      </div>
    );
  });
  const displayCatResults = catResults?.map((cat: any, key: any) => {
    return (
      <div
        key={key}
        onClick={() => router.push(`/animals/${cat.id}`)}
        className="group m-2 shadow w-44 rounded-md hover:cursor-pointer"
      >
        <div className="flex h-36 w-44">
          <img
            className="flex w-full object-cover"
            src={cat.imageUrl}
            alt={`${cat.name}'s avatar`}
          />
        </div>
        <div className="p-2 group-hover:bg-purple-500 duration-150 rounded-b-md group-hover:text-white">
          <p className="text-xl text-center font-Titillium-Web capitalize">
            {cat.name}
          </p>
          <p className="truncate text-center w-full font-Work-Sans capitalize">
            {cat.breed}
          </p>
        </div>
      </div>
    );
  });

  return (
    <Layout>
      <Head>
        <title>Find a pet</title>
      </Head>
      <div className="bg-zinc-50 flex-col flex-1 h-full">
        <div className="container flex flex-col mx-auto">
          <h1 className="text-3xl text-putple-800 my-10 text-purple-800">
            Find A Pet!
          </h1>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="flex flex-1 flex-col">
              <p className="text-xl mb-2">Filter By:</p>{" "}
              <div className="flex flex-col w-90 shadow bg-zinc-50 p-3 rounded-md border border-purple-200 ">
                <div className="flex w-min self-center ">
                  <button
                    onClick={() => setSelectedSpecies("Dog")}
                    className={
                      selectedSpecies === "Dog"
                        ? `flex text-xl items-center bg-purple-500 w-20 rounded-xl px-2 py-1 m-1 text-white`
                        : `flex text-xl items-center bg-gray-300 w-20 rounded-xl px-2 py-1 m-1 text-white`
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
                        ? `flex text-xl items-center bg-purple-500 w-20 rounded-xl px-2 py-1 m-1 text-white`
                        : `flex text-xl items-center bg-gray-300 w-20 rounded-xl px-2 py-1 m-1 text-white`
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
                  <Listbox
                    value={selectedDogBreed}
                    onChange={setSelectedDogBreed}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">
                          {selectedDogBreed}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {dogBreeds.map((breed: any, breedIdx: number) => (
                            <Listbox.Option
                              key={breedIdx}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                  active
                                    ? "text-purple-900 bg-purple-100"
                                    : "text-gray-900"
                                }`
                              }
                              value={breed}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {breed}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                ) : (
                  <Listbox
                    value={selectedCatBreed}
                    onChange={setSelectedCatBreed}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">
                          {selectedCatBreed}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {catBreeds.map((breed: string, breedIdx: number) => (
                            <Listbox.Option
                              key={breedIdx}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                  active
                                    ? "text-purple-900 bg-purple-100"
                                    : "text-gray-900"
                                }`
                              }
                              value={breed}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {breed}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                )}

                <h3 className="text-lg">Age:</h3>
                <div className="relative mt-1">
                  {selectedSpecies === "Dog" ? (
                    <Listbox value={selectedAge} onChange={setSelectedAge}>
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selectedAge}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Puppy"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Puppy
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Young"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Young
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Adult"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Adult
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Senior"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Senior
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  ) : (
                    <Listbox
                      value={selectedCatAge}
                      onChange={setSelectedCatAge}
                    >
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selectedCatAge}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Kitten"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Kitten
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Young"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Young
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Adult"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Adult
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Senior"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Senior
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  )}
                </div>
                <h3 className="text-lg">Size:</h3>
                <div className="relative mt-1">
                  {selectedSpecies === "Dog" ? (
                    <Listbox value={selectedSize} onChange={setSelectedSize}>
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selectedSize}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Small"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Small (18-25 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Medium"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Medium (25-35 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Large"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Large (35-55 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Extra-Large"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Extra Large (55+ lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                      {/* HERE */}
                    </Listbox>
                  ) : (
                    <Listbox
                      value={selectedCatSize}
                      onChange={setSelectedCatSize}
                    >
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">
                          {selectedCatSize}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Small"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Small (10-15 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Medium"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Medium (15-20 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value="Large"
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  Large (20-35 lbs)
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow sm:ml-5">
              <h3 className="text-xl">Results</h3>
              <div className="py-3 container rounded grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center shadow">
                {selectedSpecies === "Dog" ? (
                  <> {displayDogResults} </>
                ) : (
                  <>{displayCatResults}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default findpet;
