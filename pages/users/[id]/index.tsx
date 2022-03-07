import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Head from "next/head";
import AnimalCard from "../../../components/AnimalCard";
import Layout from "../../../components/Layout";
import { useState } from "react";
import UserBio from "../../../components/UserBio";
import { LocationPin } from "@styled-icons/entypo/LocationPin";
import {Email}from "@styled-icons/material/Email"

export const FETCH_USER = gql`
  query FetchUser($id: String!) {
    fetchUser(id: $id) {
      name
      id
      image
      status
      location
      publicEmail
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
  const { data: session } = useSession()
  const router = useRouter();
  let userId = router.query.id;  
  const [openEditProfileModule, setOpenEditProfileModule]= useState(false)
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { id: userId },
  });
  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  let user = data?.fetchUser[0];

  return (
    <>
      <Layout>
      <Head>
        <title>{`${user.name}'s Profile`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
     
      <div className="w-full flex flex-col self-center relative">
         <div className="container flex flex-col mx-auto my-10">
           <div className="w-full flex flex-col my-5 items-center sm:items-start">
            <div className="flex w-36 h-36 rounded-full bg">
              <img
                src={user?.image}
                alt={`${user.name}'s avatar`}
                className="rounded-full w-full h-full"
              />
            </div>
            <p className="text-3xl font-light">{user.name}</p>
           <div className="flex flex-col justify-center">
             {user.status ? <p className="text-xl font-light">{user.status}</p> : null}
             {user.location ? <div className="flex items-center"><div className="w-7 text-purple-600"><LocationPin /></div><p className="text-xl font-light">{user.location}</p></div> : <p>No location provided</p>}
             {user.publicEmail ? <div className="flex items-center"><div className="w-7 text-purple-600"><Email /></div><p className="text-xl font-light">{user.publicEmail}</p></div> : <p>No email provided</p>}
             {session && (
              openEditProfileModule ? (<div className="my-2"><button className='bg-purple-600 text-white px-2 py-1 rounded-lg w-16' onClick={()=> setOpenEditProfileModule((openEditProfileModule)=> !openEditProfileModule)}>Close</button></div>):(
            <div className='my-2'><button className='bg-purple-600 px-2 text-white py-1 rounded-lg w-16' type='submit' onClick={()=> setOpenEditProfileModule((openEditProfileModule)=> !openEditProfileModule)}>Edit</button></div>
            )
            )}
            
            {openEditProfileModule && (
            <div className="flex">
              <UserBio />
            </div>)}
           </div>
          </div>
          <h3 className="text-2xl text-center sm:text-left">
            Favorited Animals
          </h3>
          <ul className="flex flex-wrap justify-center  grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {user &&
              user.favoriteAnimals.map((pet: any, key: any) => (
                <li
                  className="flex flex-col max-w-md my-2 shadow bg-white rounded h-auto"
                  key={key}
                >
                  <AnimalCard
                    weight={pet.weight}
                    description={pet.description}
                    dob={pet.dob}
                    species={pet.species}
                    image={pet.imageUrl}
                    name={pet.name}
                    color={pet.color}
                    breed={pet.breed}
                    id={pet.id}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default index;
