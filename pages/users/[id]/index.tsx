import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Header from "../../../components/Header";

const FETCH_USER = gql`
  query FetchUser($userId: String!) {
    fetchUser(id: $userId) {
      name
      id
      image
    }
  }
`;

const index = () => {
  const router = useRouter();
  let userId = router.query.id;
  const { data, loading, error } = useQuery(FETCH_USER, {
    variables: { userId },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;
  let user = data.fetchUser[0];
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-medium">Pet Connect</h1>

      <Header />

      <Image
        src={user.image}
        alt={`${user.name}'s avatar`}
        width={150}
        height={150}
        className="rounded-full"
      />
      <p> {user.name} </p>
    </div>
  );
};

export default index;
