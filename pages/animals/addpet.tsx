import CreatePetListing from "../../components/CreatePetListing";
import Layout from "../../components/Layout";

const addpet = () => {
  return (
    <Layout>
      <div className="bg-gray-100 flex-col flex-1 h-full">
        <h1 className="font-light text-center text-3xl py-5">
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
