import CreatePetListing from "../../components/CreatePetListing";
import Layout from "../../components/Layout";

const addpet = () => {
  return (
    <Layout>
      <div className="bg-zinc-50 flex-col flex-1 h-full">
        <h1 className="font-normal text-center text-3xl mt-2 py-5 text-purple-800">
          Create new pet listing
        </h1>
        <div className="w-full flex items-center justify-center my-5">
          <CreatePetListing />
        </div>
      </div>
    </Layout>
  );
};

export default addpet;
