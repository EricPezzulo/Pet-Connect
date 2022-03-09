import { useEffect, useState } from "react";
import { heros } from "../data/imageHeros";

const ImageSlider = () => {
  const [sliderIndex, setSliderIndex] = useState(3);
  //   useEffect(() => {
  //     // setSliderImage(heros[sliderIndex]);
  //     changeImage();
  //   }, [sliderIndex]);
  //   const changeImage = () => {
  //     setInterval(() => {
  //       if (sliderIndex < 3) {
  //         setSliderIndex(sliderIndex + 1);
  //       }
  //       if (sliderIndex >= 3) {
  //         setSliderIndex(0);
  //       }
  //     }, 2000);
  //   };
  console.log(sliderIndex);
  return (
    <div className="flex relative justify-center items-center flex-col w-full  h-96 sm:h-102  shadow">
      <img
        src={heros?.[sliderIndex]}
        alt="Hero"
        className="w-full object-cover h-full"
      />

      <div className="flex group p-4  w-min absolute justify-center items-center top-0 mx-auto ">
        <button
          aria-label="Image 1"
          onClick={() => {
            setSliderIndex(0);
          }}
          className="bg-purple-300 opacity-60 hover:bg-purple-500 duration-150 group-hover:opacity-100 w-8 h-2 mx-2 shadow rounded-full"
        ></button>
        <button
          aria-label="Image 2"
          onClick={() => {
            setSliderIndex(1);
          }}
          className="bg-purple-300 opacity-60 hover:bg-purple-500 duration-150 group-hover:opacity-100 w-8 h-2 mx-2 shadow rounded-full"
        ></button>
        <button
          aria-label="Image 3"
          onClick={() => {
            setSliderIndex(2);
          }}
          className="bg-purple-300 opacity-60 hover:bg-purple-500 duration-150 group-hover:opacity-100 w-8 h-2 mx-2 shadow rounded-full"
        ></button>
        <button
          aria-label="Image 4"
          onClick={() => {
            setSliderIndex(3);
          }}
          className="bg-purple-300 opacity-60 hover:bg-purple-500 duration-150 group-hover:opacity-100 w-8 h-2 mx-2 shadow rounded-full"
        ></button>
      </div>
    </div>
  );
};

export default ImageSlider;
