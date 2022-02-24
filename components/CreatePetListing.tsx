import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { Close } from "@styled-icons/evaicons-solid/Close";
import React, { Fragment, useState } from "react";
import { FETCH_ALL_ANIMALS } from "../pages";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

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
  const [errorMsg, setErrorMsg]=useState(false)
  const [loginErr, setLoginErr]=useState(false)

  const [selectedSpecies, setSelectedSpecies]=useState("Dog")
  const { data:session }:any = useSession()


  const submitPet = (e: any) => {
    e.preventDefault();
    setNewPet({...newPet, species: selectedSpecies})
    if(!session) return setLoginErr(true)
    if(newPet.name===""||newPet.dob===""|| newPet.weight===""|| newPet.color===""||newPet.gender===""||newPet.breed===""||newPet.species===""|| newPet.description==="" || newPet.streetAddress===""||newPet.city===""||newPet.zipCode===""||newPet.imageUrl===""|| newPet.state==='' || newPet.contactEmail==="") return setErrorMsg(true)
    createNewPetListing({
      variables: {
        name: newPet.name.toLocaleLowerCase(),
        dob: newPet.dob,
        weight: newPet.weight,
        color: newPet.color.toLocaleLowerCase(),
        gender: newPet.gender.toLocaleLowerCase(),
        breed: newPet.breed.toLocaleLowerCase(),
        species: newPet.species.toLocaleLowerCase(),
        childFriendly: newPet.childFriendly,
        dogFriendly: newPet.dogFriendly,
        catFriendly: newPet.catFriendly,
        vaccinationsUptoDate: newPet.vaccinationsUptoDate,
        description: newPet.description,
        imageUrl: newPet.imageUrl,
        city: newPet.city.toLocaleLowerCase(),
        state: newPet.state.toLocaleLowerCase(),
        streetAddress: newPet.streetAddress.toLocaleLowerCase(),
        zipCode: newPet.zipCode,
        contactEmail: newPet.contactEmail.toLocaleLowerCase(),
        additionalInfo: newPet.additionalInfo.toLocaleLowerCase()
      },
      refetchQueries: [{ query: FETCH_ALL_ANIMALS }]
    });
    setSuccessMsg(true);
     setTimeout(() => {
       setSuccessMsg(false), 
       setNewPet({name:"",dob:"",color:"", weight:"", gender:"", breed:"", species:"", childFriendly:false, dogFriendly:false, catFriendly:false, vaccinationsUptoDate:false, description:"", imageUrl:"",city:"", state:"", streetAddress:"",zipCode:"", contactEmail:"", additionalInfo:""})}, 2500) 
    };

  return (
    <>
      {successMsg && (
        <div className="flex w-96 h-44 absolute z-50 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
          <button
            className="w-8 absolute top-2 right-2 hover:text-red-500 duration-200"
            onClick={() => setSuccessMsg(false)}
          >
            <Close />
          </button>
          <p>{newPet.name} has been added!</p>
        </div>
      )}
      {errorMsg && (
       <div className="flex w-96 h-44 absolute z-50 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
       <button
         className="w-8 absolute top-2 right-2 bg-red-500 rounded text-white duration-200"
         onClick={() => setErrorMsg(false)}
       >
         <Close />
       </button>
       <p className='text-xl font-light'>Please fill out all required fields</p>
       <button
         className="absolute bottom-4 bg-gray-100  rounded border border-gray-400 px-5 py-1"
         onClick={() => setErrorMsg(false)}
       >
         Ok
       </button>
     </div>
      )}
      {loginErr &&(
        <div className="flex w-96 h-56 absolute z-50 justify-center items-center self-center bg-white border-2 border-violet-400 rounded shadow-md">
        <button
          className="w-8 absolute top-2 right-2 bg-red-500 rounded text-white duration-200"
          onClick={() => setLoginErr(false)}
        >
          <Close />
        </button>
        <div className='flex flex-col text-center'>
          <p className='text-xl font-light'>You must be logged in to use this feature.</p>
          <p className='text-xl font-light'>Please Login or create an account.</p>
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
                  Name:<span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ronald"
                  className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                />
             
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="dob"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                DOB:<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                placeholder="08/12/2022"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.dob}
                onChange={(e) => setNewPet({ ...newPet, dob: e.target.value })}
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="gender"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Gender:<span className='text-red-500'>*</span>
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
                Street Address:<span className='text-red-500'>*</span>
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
                State:<span className='text-red-500'>*</span>
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
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Breed:<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                placeholder="Laborador"
                className="rounded-md px-2 py-2 bg-pwhite border-purple-300 border font-light bg-zinc-50 sm:bg-white outline-none mx-1"
                value={newPet.breed}
                onChange={(e) =>
                  setNewPet({ ...newPet, breed: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1">
              <label
                htmlFor="color"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Color:<span className='text-red-500'>*</span>
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
            <div className="flex flex-col py-1">
              <label
                htmlFor="weight"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Weight:<span className='text-red-500'>*</span>
              </label>
              <input
                type="number"
                placeholder="45 (lbs)"
                className="rounded-md px-2 py-2 sm:bg-white border-purple-300 border font-light bg-zinc-50 outline-none mx-1"
                value={newPet.weight}
                onChange={(e) =>
                  setNewPet({ ...newPet, weight: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col relative py-1">
              {/* <label
                htmlFor="species"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
              >
                Species:<span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                placeholder="Dog"
                className="rounded-md px-2 py-2 bg-zinc-50 sm:bg-white border-purple-300 border font-light outline-none mx-1"
                value={newPet.species}
                onChange={(e) =>
                  setNewPet({ ...newPet, species: e.target.value })
                }
              /> */}
              <label
                htmlFor="species"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 z-50 sm:bg-white"
              >
                Species:<span className='text-red-500'>*</span>
              </label>
              <Listbox value={selectedSpecies} onChange={setSelectedSpecies}>
              <Listbox.Button className="relative  py-2 mx-1 pl-3 pr-10 text-left sm:bg-white rounded-lg cursor-pointer border border-purple-300 focus:outline-none sm:text">
                      <span className="block truncate font-light">{selectedSpecies}</span>
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
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Dog"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
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
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Cat"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
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
                City:<span className='text-red-500'>*</span>
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
                Zip Code:<span className='text-red-500'>*</span>
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
              Contact Email:<span className='text-red-500'>*</span>
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
          <p className="font-light text-gray-500 pb-3 pl-5">
            *Default is FALSE
          </p>
          <div className="flex flex-col  sm:flex-row justify-around">
            <label className="text-gray-500">
              Child Friendly{" "}
            </label><input
                type="checkbox"
                name="childFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left checked:rounded mx-1 cursor-pointer"
                checked={newPet.childFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, childFriendly: e.target.checked })
                }
              />{" "}
            <label className="text-gray-500">
              Dog Friendly{" "}
              
            </label><input
                type="checkbox"
                name="catFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded  mx-1 cursor-pointer"
                checked={newPet.dogFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, dogFriendly: e.target.checked })
                }
              />{" "}
            <label className="text-gray-500">
              Cat Friendly
            </label>
             <input
                type="checkbox"
                name="childFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded  mx-1 cursor-pointer"
                checked={newPet.catFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, catFriendly: e.target.checked })
                }
              />{" "}
            <label className="text-gray-500">
              Vaccinated{" "}
              
            </label><input
                type="checkbox"
                name="childFriendly"
                checked={newPet.vaccinationsUptoDate}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-500 checked:border-purple-700 checked:rounded focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain  mx-1 cursor-pointer"
                onChange={(e: any) =>
                  setNewPet({
                    ...newPet,
                    vaccinationsUptoDate: e.target.checked,
                  })
                }
              />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col py-1">
            <label
              htmlFor="name"
              className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
            >
              Description:
            </label>

            <textarea
              value={newPet.description}
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
            className="flex w-24 justify-center relative top-3 left-5 px-2 text-gray-500 bg-zinc-50 sm:bg-white"
          >
            Image Url:
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
