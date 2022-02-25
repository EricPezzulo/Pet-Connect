import { useState } from "react";
import Layout from "../components/Layout";

const uploadimage = () => {
  const [picture, setPicture] = useState();
  return (
    <Layout>
      <div>
        <label htmlFor="uploadImage">Choose File</label>
        <input
          className=" bg-red-200"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setPicture(e)}
          value={picture}
        />
      </div>
    </Layout>
  );
};

export default uploadimage;
