import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { Close } from "@styled-icons/evaicons-solid/Close";
import React, { useState } from "react";

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

  const submitPet = (e: any) => {
    e.preventDefault();
    createNewPetListing({
      variables: {
        name: newPet.name,
        dob: newPet.dob,
        weight: newPet.weight,
        color: newPet.color,
        gender: newPet.gender,
        breed: newPet.breed,
        species: newPet.species,
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
      },
    });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };
  //   console.log(
  //     `kid friendly: ${newPet.childFriendly} \ndog friendly: ${newPet.dogFriendly} \ncat friendly: ${newPet.catFriendly} \nvaccinations: ${newPet.vaccinationsUptoDate}`
  //   );
  return (
    <>
      {successMsg && (
        <div className="flex w-96 h-44 absolute z-50 justify-center items-center self-center bg-gray-200 border border-gray-400  shadow-md">
          <button
            className="w-8 absolute top-2 right-2 hover:text-red-500 duration-200"
            onClick={() => setSuccessMsg(false)}
          >
            <Close />
          </button>
          <p>{newPet.name} has been added!</p>
        </div>
      )}
      <form className="flex flex-col bg-purple-50 border border-purple-300 rounded-md shadow p-5 max-w-2xl">
        <div className="flex justify-center">
          <div className="flex flex-col ">
            <div className="flex flex-col py-1">
              <label
                htmlFor="name"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Name:
              </label>
              <input
                type="text"
                placeholder="Ronald"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="dob"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                DOB:
              </label>
              <input
                type="text"
                placeholder="08/12/2022"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.dob}
                onChange={(e) => setNewPet({ ...newPet, dob: e.target.value })}
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="gender"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Gender:
              </label>
              <input
                type="text"
                placeholder="Male"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.gender}
                onChange={(e) =>
                  setNewPet({ ...newPet, gender: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="streetaddr"
                className="w-32 relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Street Address:
              </label>
              <input
                type="text"
                placeholder="1234 Rockyway Road"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.streetAddress}
                onChange={(e) =>
                  setNewPet({ ...newPet, streetAddress: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="state"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                State:
              </label>
              <input
                type="text"
                placeholder="FL"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.state}
                onChange={(e) =>
                  setNewPet({ ...newPet, state: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="breed"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Breed:
              </label>
              <input
                type="text"
                placeholder="Laborador"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
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
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Color:
              </label>
              <input
                type="text"
                placeholder="Golden"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.color}
                onChange={(e) =>
                  setNewPet({ ...newPet, color: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="weight"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Weight:
              </label>
              <input
                type="text"
                placeholder="45 (lbs)"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.weight}
                onChange={(e) =>
                  setNewPet({ ...newPet, weight: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col py-1">
              <label
                htmlFor="species"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Species:
              </label>
              <input
                type="text"
                placeholder="Dog"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.species}
                onChange={(e) =>
                  setNewPet({ ...newPet, species: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="city"
                className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                City:
              </label>
              <input
                type="text"
                placeholder="London"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.city}
                onChange={(e) => setNewPet({ ...newPet, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col py-1">
              <label
                htmlFor="zipcode"
                className="flex w-24 justify-center relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
              >
                Zip Code:
              </label>
              <input
                type="text"
                placeholder="12345"
                className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
                value={newPet.zipCode}
                onChange={(e) =>
                  setNewPet({ ...newPet, zipCode: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <hr className="border-purple-300 mt-4" />

        <div className="flex justify-center ">
          <div className="flex flex-col py-1">
            <label
              htmlFor="contactEmail"
              className="flex w-32 justify-center relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
            >
              Contact Email:
            </label>
            <input
              type="text"
              placeholder="jdoe@email.com"
              className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
              value={newPet.contactEmail}
              onChange={(e) =>
                setNewPet({ ...newPet, contactEmail: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col py-1">
            <label
              htmlFor="additionalInfo"
              className="flex w-36 justify-center relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
            >
              Additional Info:
            </label>
            <input
              type="text"
              placeholder="allergies, medical conditons, etc."
              className="rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
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
          <div className="flex justify-around">
            <label className="text-gray-500">
              Child Friendly{" "}
              <input
                type="checkbox"
                name="childFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left checked:rounded mr-2 cursor-pointer"
                checked={newPet.childFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, childFriendly: e.target.checked })
                }
              />
            </label>{" "}
            <label className="text-gray-500">
              Dog Friendly{" "}
              <input
                type="checkbox"
                name="catFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded float-left mr-2 cursor-pointer"
                checked={newPet.dogFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, dogFriendly: e.target.checked })
                }
              />
            </label>{" "}
            <label className="text-gray-500">
              Cat Friendly{" "}
              <input
                type="checkbox"
                name="childFriendly"
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain checked:rounded float-left mr-2 cursor-pointer"
                checked={newPet.catFriendly}
                onChange={(e: any) =>
                  setNewPet({ ...newPet, catFriendly: e.target.checked })
                }
              />
            </label>{" "}
            <label className="text-gray-500">
              Vaccinated{" "}
              <input
                type="checkbox"
                name="childFriendly"
                checked={newPet.vaccinationsUptoDate}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-purple-600 checked:border-purple-600 checked:rounded focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                onChange={(e: any) =>
                  setNewPet({
                    ...newPet,
                    vaccinationsUptoDate: e.target.checked,
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col py-1">
            <label
              htmlFor="name"
              className="flex w-min relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
            >
              Description:
            </label>

            <textarea
              value={newPet.description}
              onChange={(e) =>
                setNewPet({ ...newPet, description: e.target.value })
              }
              className="flex w-full h-20 rounded-md px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1 p-2 resize-none"
              placeholder="Please provide a description of your pet here."
            ></textarea>
          </div>
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="flex w-24 justify-center relative top-3 left-5 px-2 text-gray-500 bg-purple-50"
          >
            Image Url:
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="rounded-md w-full  px-2 py-2 bg-purple-50 border-purple-300 border font-light outline-none mx-1"
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
