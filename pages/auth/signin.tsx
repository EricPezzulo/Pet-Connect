import { signIn } from "next-auth/react";
import Layout from "../../components/Layout";
const signin = () => {
  return (
    <div className="w-full min-h-screen">
      <Layout>
        <div className="bg-white shadow  rounded-md h-auto py-10 w-1/3 self-center mt-20">
          <p className="text-xl text-center">Sign In with social </p>
          <hr className="mt-2 mb-10" />
          <div className="flex items-center justify-center h-full">
            <button
              className="flex items-center shadow px-2 py-1 rounded-md"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "https://pet-connect.vercel.app/",
                })
              }
            >
              <div className="w-7 mr-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                  alt=""
                />
              </div>
              <p className="text-xl">Sign In with Google</p>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default signin;
