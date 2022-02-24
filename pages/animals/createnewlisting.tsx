import Head from "next/head";
import CreatePetListing from "../../components/CreatePetListing";
import Layout from "../../components/Layout";

const createnewlisting = () => {
  return (
    <Layout>
      <Head>
        <title>Create New Listing</title>
      </Head>
      <div className="bg-zinc-50 flex-col flex-1 h-full">
        <h1 className="font-normal text-center text-3xl mt-8 sm:mb-5 text-purple-800">
          Create new listing
        </h1>
        <div className="w-full flex items-center justify-center sm:mb-5">
          <CreatePetListing />
        </div>
      </div>
    </Layout>
  );
};

export default createnewlisting;
