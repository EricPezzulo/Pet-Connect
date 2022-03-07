import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { Close } from "@styled-icons/evaicons-solid/Close";
import React, { Fragment, useEffect, useState } from "react";
import { FETCH_ALL_ANIMALS } from "../pages";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import axios from "axios";

const CREATE_NEW_PET_LISTING = gql`
  mutation CreateNewAnimalListing(
    $name: String!
    $dob: String!
    $weight: String!
    $color: String!
    $gender: String!
    $breed: String!
    $species: String!
    $childFriendly: Boolean!
    $dogFriendly: Boolean!
    $catFriendly: Boolean!
    $vaccinationsUptoDate: Boolean!
    $description: String!
    $imageUrl: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $streetAddress: String!
    $contactEmail: String!
    $additionalInfo: String
  ) {
    createNewAnimalListing(
      name: $name
      dob: $dob
      weight: $weight
      color: $color
      gender: $gender
      breed: $breed
      species: $species
      childFriendly: $childFriendly
      dogFriendly: $dogFriendly
      catFriendly: $catFriendly
      vaccinationsUptoDate: $vaccinationsUptoDate
      description: $description
      imageUrl: $imageUrl
      city: $city
      state: $state
      zipCode: $zipCode
      streetAddress: $streetAddress
      contactEmail: $contactEmail
      additionalInfo: $additionalInfo
    ) {
      name
    }
  }
`;

const CreatePetListing = () => {
  const [newPet, setNewPet] = useState({
    name: "",
    dob: "",
    color: "",
    weight: "",
    imageUrl: "",
    species: "",
    breed: "",
    gender: "",
    childFriendly: false,
    dogFriendly: false,
    catFriendly: false,
    vaccinationsUptoDate: false,
    description: "",
    additionalInfo: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactEmail: "",
  });
  const [createNewPetListing] = useMutation(CREATE_NEW_PET_LISTING);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState("Dog");
  const [catBreeds, setCatBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedCatBreed, setSelectedCatBreed] = useState("");
  const [selectedDogBreed, setSelectedDogBreed] = useState("");
  const [selectedDogSize, setSelectedDogSize] = useState("Small")
  const [selectedCatSize, setSelectedCatSize] = useState("Small")
  const [selectedDogAge, setSelectedDogAge] = useState("Puppy")
  const [selectedCatAge, setSelectedCatAge] = useState("Kitten")
  const { data: session }: any = useSession();
  const submitPet = (e: any) => {
    e.preventDefault();
    setNewPet({ ...newPet, species: selectedSpecies });
    if (!session) return setLoginErr(true);
    if (
      newPet.name === "" ||
      // newPet.dob === "" ||
      // newPet.weight === "" ||
      newPet.color === "" ||
      newPet.gender === "" ||
      // newPet.breed === "" ||
      // newPet.species === "" ||
      newPet.description === "" ||
      newPet.streetAddress === "" ||
      newPet.city === "" ||
      newPet.zipCode === "" ||
      newPet.imageUrl === "" ||
      newPet.state === "" ||
      newPet.contactEmail === ""
    ) {
      return setErrorMsg(true);
    }
    if (selectedSpecies === "Dog") {
      createNewPetListing({
        variables: {
          name: newPet.name,
          dob: selectedDogAge,
          weight: selectedDogSize,
          color: newPet.color,
          gender: newPet.gender,
          breed: selectedDogBreed,
          species: selectedSpecies,
          childFriendly: newPet.childFriendly,
          dogFriendly: newPet.dogFriendly,
          catFriendly: newPet.catFriendly,
          vaccinationsUptoDate: newPet.vaccinationsUptoDate,
          description: newPet.description,
          imageUrl: newPet.imageUrl,
          city: newPet.city,
          state: newPet.state,
          streetAddress: newPet.streetAddress,
          zipCode: newPet.zipCode,
          contactEmail: newPet.contactEmail,
          additionalInfo: newPet.additionalInfo,
        },
        refetchQueries: [{ query: FETCH_ALL_ANIMALS }],
      });
    }
    if (selectedSpecies === "Cat") {
      createNewPetListing({
        variables: {
          name: newPet.name,
          dob: selectedCatAge,
          weight: selectedCatSize,
          color: newPet.color,
          gender: newPet.gender,
          breed: selectedCatBreed,
          species: selectedSpecies,
          childFriendly: newPet.childFriendly,
          dogFriendly: newPet.dogFriendly,
          catFriendly: newPet.catFriendly,
          vaccinationsUptoDate: newPet.vaccinationsUptoDate,
          description: newPet.description,
          imageUrl: newPet.imageUrl,
          city: newPet.city,
          state: newPet.state,
          streetAddress: newPet.streetAddress,
          zipCode: newPet.zipCode,
          contactEmail: newPet.contactEmail,
          additionalInfo: newPet.additionalInfo,
        },
        refetchQueries: [{ query: FETCH_ALL_ANIMALS }],
      });
    }
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false),
        setNewPet({
          name: "",
          dob: "",
          color: "",
          weight: "",
          gender: "",
          breed: "",
          species: "",
          childFriendly: false,
          dogFriendly: false,
          catFriendly: false,
          vaccinationsUptoDate: false,
          description: "",
          imageUrl: "",
          city: "",
          state: "",
          streetAddress: "",
          zipCode: "",
          contactEmail: "",
          additionalInfo: "",
        }),
        setSelectedCatAge(""),
        setSelectedDogAge(""),
        setSelectedDogSize("")
        setSelectedCatSize("")
        setSelectedCatBreed("")
        setSelectedDogBreed("")
        setSelectedSpecies("")
    }, 2500);
  };
  useEffect(() => {
    const fetchCatBreeds = async () => {
      const res: any = await axios.get(
        "https://api.thecatapi.com/v1/breeds?attach_breed=0"
      );
      setCatBreeds(res.data.map((breeds: any) => breeds.name));
      setSelectedCatBreed(res.data[0].name);
    };
    const fetchDogBreeds = async () => {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      const data = res.data.message;
      const listOfDogBreeds: any = Object.entries(data).map(
        (breed: any) => breed[0].charAt(0).toUpperCase() + breed[0].substring(1)
      );
      setDogBreeds(listOfDogBreeds);
      setSelectedDogBreed(Object.entries(data)[0][0])
    };
    fetchDogBreeds();
    fetchCatBreeds();
  }, []);
  return (
    <>
      {successMsg && (
        <div className="flex w-96 h-44 absolute z-60 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
          <button
            className="w-8 absolute top-2 right-2 hover:text-red-500 duration-200"
            onClick={() => setSuccessMsg(false)}
          >
            <Close />
          </button>
          <p>{newPet.name} has been added!</p>
          <button
            className="absolute bottom-4 bg-gray-100  rounded border border-gray-400 px-5 py-1"
            onClick={() => setSuccessMsg(false)}
          >
            Ok
          </button>
        </div>
      )}
      {errorMsg && (
        <div className="flex w-96 h-44 absolute z-60 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
          <button
            className="w-8 absolute top-2 right-2 bg-red-500 rounded text-white duration-200"
            onClick={() => setErrorMsg(false)}
          >
            <Close />
          </button>
          <p className="text-xl font-light">
            Please fill out all required fields
          </p>
          <button
            className="absolute bottom-4 bg-gray-100  rounded border border-gray-400 px-5 py-1"
            onClick={() => setErrorMsg(false)}
          >
            Ok
          </button>
        </div>
      )}
      {loginErr && (
        <div className="flex w-96 h-56 absolute z-60 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
          <button
            className="w-8 absolute top-2 right-2 bg-red-500 rounded text-white duration-200"
            onClick={() => setLoginErr(false)}
          >
            <Close />
          </button>
          <div className="flex flex-col text-center">
            <p className="text-xl font-light">
              You must be logged in to use this feature.
            </p>
            <p className="text-xl font-light">
              Please Login or create an account.
            </p>
          </div>
          <button
            className="absolute bottom-4 bg-gray-100  rounded border border-gray-400 px-5 py-1"
            onClick={() => setLoginErr(false)}
          >
            Ok
          </button>
        </div>
      )}
      <form className="flex flex-col w-full sm:w-min sm:bg-white sm:border sm:border-purple-300 rounded-md sm:shadow px-5 sm:pb-5 mb-5 max-w-2xl">
        <div className="sm:flex justify-center">
          <div className="flex flex-col">
            <div className="flex flex-col py-1">
              <label
                htmlFor="name"
                className="flex w-min relative top-3 left-5 px-2 bg-zinc-50 sm:bg-white text-gray-500 "
              >
                Name:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ronald"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col relative py-1">
              <label
                htmlFor="dob"
                className="flex w-min z-60 relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Age:<span className="text-red-500">*</span>
              </label>
            { selectedSpecies === "Dog" ? (
              <Listbox value={selectedDogAge} onChange={setSelectedDogAge}>
              <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                <span className="block truncate font-light">
                  {selectedDogAge}
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
                <Listbox.Options className="absolute w-full py-1 mt-18 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Puppy"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Puppy (Upto 2 years old)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Young"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                         Young (3-5 years old) 
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Adult"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Adult (5-8 years old)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Senior"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Senior (8+ years old)
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
            </Listbox>):
            <Listbox value={selectedCatAge} onChange={setSelectedCatAge}>
            <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
              <span className="block truncate font-light">
                {selectedCatAge}
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
              <Listbox.Options className="absolute w-full py-1 mt-18 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                <Listbox.Option
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                      ? "text-purple-900 bg-purple-100"
                      : "text-gray-900"
                    }`
                  }
                  value="Kitten"
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        Kitten (Upto 2 years old)
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
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                      ? "text-purple-900 bg-purple-100"
                      : "text-gray-900"
                    }`
                  }
                  value="Young"
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                       Young (3-5 years old) 
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
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                      ? "text-purple-900 bg-purple-100"
                      : "text-gray-900"
                    }`
                  }
                  value="Adult"
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        Adult (5-8 years old)
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
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                      ? "text-purple-900 bg-purple-100"
                      : "text-gray-900"
                    }`
                  }
                  value="Senior"
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        Senior (8+ years old)
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
}
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="gender"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Gender:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Male"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.gender}
                onChange={(e) =>
                  setNewPet({ ...newPet, gender: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="streetaddr"
                className="w-34 relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Street Address:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="1234 Rockyway Road"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.streetAddress}
                onChange={(e) =>
                  setNewPet({ ...newPet, streetAddress: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="state"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                State:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="FL"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.state}
                onChange={(e) =>
                  setNewPet({ ...newPet, state: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="breed"
                className="flex w-min relative top-4 left-5 z-50 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Breed:<span className="text-red-500 z-50">*</span>
              </label>

              {selectedSpecies === "Dog" ? (
                <Listbox
                  value={selectedDogBreed}
                  onChange={setSelectedDogBreed}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                      <span className="block truncate capitalize font-light">
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
                      <Listbox.Options className="absolute w-full z-60 py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {dogBreeds.map((breed: any, breedIdx: number) => (
                          <Listbox.Option
                            key={breedIdx}
                            className={({ active }) =>
                              `cursor-default capitalize select-none relative py-2 pl-10 z-60 pr-4 ${active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                              }`
                            }
                            value={breed}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"
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
                    <Listbox.Button className="relative z-60 py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                      <span className="block truncate font-light">
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
                              `cursor-default select-none relative py-2 z-60 pl-10 pr-4 ${active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                              }`
                            }
                            value={breed}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? "font-medium" : "font-normal"
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
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1">
              <label
                htmlFor="color"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Color:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Golden"
                className="rounded-md px-2 py-2 bgwhite border-purple-300 border  bg-zinc-50 sm:bg-white font-light outline-none mx-1"
                value={newPet.color}
                onChange={(e) =>
                  setNewPet({ ...newPet, color: e.target.value })
                }
              />
            </div>

            {/* WEIGHT  START*/}
            <div className="flex flex-col relative py-1">
              <label
                htmlFor="weight"
                className="flex w-min z-40 relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Weight:<span className="text-red-500">*</span>
              </label>

              {selectedSpecies === "Dog" ? (
              <Listbox value={selectedDogSize} onChange={setSelectedDogSize}>
              <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                <span className="block truncate font-light">
                  {selectedDogSize}
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
                <Listbox.Options className="absolute w-full py-1 mt-18 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Small"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Small (Upto 25 lbs)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Medium"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Medium (25-40 lbs)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Large"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Large (40-55 lbs)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Extra Large"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
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
            </Listbox>
              ):
              <Listbox value={selectedCatSize} onChange={setSelectedCatSize}>
              <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                <span className="block truncate font-light">
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
                <Listbox.Options className="absolute w-full py-1 mt-18 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Small"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Small (Upto 20 lbs)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Medium"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Medium (20-35 lbs)
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
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                        ? "text-purple-900 bg-purple-100"
                        : "text-gray-900"
                      }`
                    }
                    value="Large"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          Large (35+ lbs)
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
            </Listbox>}
            </div> 
            {/* WEIGHT  END*/}

            <div className="flex flex-col relative py-1">
              <label
                htmlFor="weight"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 z-40 sm:bg-white"
              >
                Species:<span className="text-red-500">*</span>
              </label>
              <Listbox value={selectedSpecies} onChange={setSelectedSpecies}>
                <Listbox.Button className="relative py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                  <span className="block truncate font-light">
                    {selectedSpecies}
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
                  <Listbox.Options className="absolute w-full py-1 mt-18 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                    <Listbox.Option
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                          ? "text-purple-900 bg-purple-100"
                          : "text-gray-900"
                        }`
                      }
                      value="Dog"
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            Dog
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
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                          ? "text-purple-900 bg-purple-100"
                          : "text-gray-900"
                        }`
                      }
                      value="Cat"
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            Cat
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
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="city"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                City:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="London"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.city}
                onChange={(e) => setNewPet({ ...newPet, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="zipcode"
                className="flex w-24 justify-center relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Zip Code:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="12345"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.zipCode}
                onChange={(e) =>
                  setNewPet({ ...newPet, zipCode: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <hr className="border-purple-300 mt-4" />

        <div className="flex flex-col sm:flex-row justify-center ">
          <div className="flex flex-col py-1">
            <label
              htmlFor="contactEmail"
              className="flex w-32 justify-center relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
            >
              Contact Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="jdoe@email.com"
              className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
              value={newPet.contactEmail}
              onChange={(e) =>
                setNewPet({ ...newPet, contactEmail: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col py-1">
            <label
              htmlFor="additionalInfo"
              className="flex w-36 justify-center relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
            >
              Additional Info:
            </label>
            <input
              type="text"
              placeholder="allergies, medical conditons, etc."
              className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
              value={newPet.additionalInfo}
              onChange={(e) =>
                setNewPet({ ...newPet, additionalInfo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col pt-5">
          <p className="font-light text-xl sm:text-base text-gray-500 pb-3 pl-5">
            *Default is FALSE
          </p>
          <div className="flex flex-col sm:flex-row justify-around">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="childFriendly"
                className="appearance-none ml-10 sm:ml-0 h-7 w-7 sm:h-4 sm:w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left checked:rounded mx-1 cursor-pointer"
                checked={newPet.childFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, childFriendly: e.target.checked })
                }
              />
              <label className="text-gray-500 flex text-xl  ml-2 sm:ml-0 sm:text-base">
                Child Friendly{" "}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="catFriendly"
                className="appearance-none ml-10 sm:ml-0 sm:h-4 sm:w-4 h-7 w-7  border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded  mx-1 cursor-pointer"
                checked={newPet.dogFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, dogFriendly: e.target.checked })
                }
              />
              <label className="text-gray-500 text-xl sm:text-base  ml-2 sm:ml-0">
                Dog Friendly{" "}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="childFriendly"
                className="appearance-none h-7 w-7 sm:h-4 sm:w-4 ml-10 sm:ml-0 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded  mx-1 cursor-pointer"
                checked={newPet.catFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, catFriendly: e.target.checked })
                }
              />
              <label className="text-gray-500 text-xl sm:text-base ml-2 sm:ml-0">
                Cat Friendly
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="childFriendly"
                checked={newPet.vaccinationsUptoDate}
                className="appearance-none h-7 w-7 sm:h-4 sm:w-4 border ml-10 sm:ml-0 border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 checked:rounded focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  mx-1 cursor-pointer"
                onChange={(e: any) =>
                  setNewPet({
                    ...newPet,
                    vaccinationsUptoDate: e.target.checked,
                  })
                }
              />
              <label className="text-gray-500 text-xl sm:text-base ml-2 sm:ml-0">
                Vaccinated
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col py-1">
            <label
              htmlFor="name"
              className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
            >
              Description:<span className="text-red-500">*</span>
            </label>

            <textarea
              value={newPet.description}
              maxLength={150}
              onChange={(e) =>
                setNewPet({ ...newPet, description: e.target.value })
              }
              className="flex w-full h-20 rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1 p-2 resize-none"
              placeholder="Please provide a description of your pet here."
            ></textarea>
          </div>
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="flex w-28 justify-center relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
          >
            Image Url:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="rounded-md w-full  px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
            value={newPet.imageUrl}
            onChange={(e) => setNewPet({ ...newPet, imageUrl: e.target.value })}
          />
        </div>
        <div className="flex w-full justify-center pt-4">
          <button
            onClick={submitPet}
            className="bg-purple-400 rounded-md px-2 py-1 text-lg font-light text-white hover:bg-purple-500 duration-100"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePetListing;
