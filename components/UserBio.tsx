import { useMutation, useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { FETCH_USER } from "../pages/users/[id]"


const UPDATE_STATUS = gql`
mutation UpdateStatus($id: String!, $status: String!) {
  updateStatus(id: $id, status: $status){
    status
  }
}`
const UPDATE_LOCATION = gql`
mutation UpdateLocation($id: String!, $location: String!) {
  updateLocation(id: $id, location: $location){
    location
  }
}`
const UPDATE_EMAIL = gql`
mutation UpdateEmail($id: String!, $publicEmail: String!) {
  updateEmail(id: $id, publicEmail: $publicEmail){
    publicEmail
    email
  }
}`

const UserBio = () => {
    const router = useRouter();
    let userId = router.query.id; 
    const [status, setStatus] = useState("")
    const [location, setLocation] = useState("")
    const [publicEmail, setPublicEmail] = useState("")
    const [updateStatusMutation] = useMutation(UPDATE_STATUS)
    const [updateLocationMutation] = useMutation(UPDATE_LOCATION)
    const [updateEmailMutation] = useMutation(UPDATE_EMAIL)
    const { data, loading, error } = useQuery(FETCH_USER, {
        variables: { id: userId },
      });
    const updateStatus = async(e:any) => {
        setStatus(e.target.value)
        await updateStatusMutation({
          variables:{
            id: userId,
            status
          },
          refetchQueries: [{ query: FETCH_USER, variables: { id: userId } }]
        })
    }
    const updateLocation = async(e:any) => {
        setLocation(e.target.value)
        
        await updateLocationMutation({
          variables:{
            id: userId,
            location
          },
          refetchQueries: [{ query: FETCH_USER, variables: { id: userId } }]
        })
    }
    const updateEmail = async(e:any) => {
      setPublicEmail(e.target.value)
      await updateEmailMutation({
        variables:{
          id: userId,
          publicEmail
        },
        refetchQueries: [{query: FETCH_USER, variables: {id: userId}}]
      })
    }
   
    const handleClick = (e:any) => {
        e.preventDefault()
        updateEmail(e)
        updateStatus(e)
        updateLocation(e)
    }
    return (
        <div>
            <form className='flex flex-col items-center justify-center p-5'>
            <div>
                <p className="">Status: </p>
                <input type="text" onChange={(e) => setStatus(e.target.value)} placeholder={data?.fetchUser[0].status} className="border border-purple-200 outline-none px-2 py-1" />
            </div>
            <div>
                <p className=''>Location:</p>
                <input type="text" onChange={(e) => setLocation(e.target.value)} placeholder={data?.fetchUser[0].location} className="border border-purple-200 outline-none  px-2 py-1" />
            </div>
            <div>
                <p className=''>Email:</p>
                <input type="text" onChange={(e) => setPublicEmail(e.target.value)} placeholder={data?.fetchUser[0].publicEmail ? data?.fetchUser[0].publicEmail : "No contact email saved"} className="border border-purple-200  px-2 py-1 outline-none" />
            </div>
            <button type='submit' className='bg-purple-600 rounded-md px-2 py-1 text-white my-2 self-center' onClick={handleClick}>Update</button>
            </form>
        </div>
    )
}

export default UserBio