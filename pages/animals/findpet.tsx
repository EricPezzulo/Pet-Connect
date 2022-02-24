import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Layout from "../../components/Layout";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { breeds } from "../../data/dogbreeds";
import Head from "next/head";
import { AnimalCat, AnimalDog } from "styled-icons/fluentui-system-regular";

const findpet = () => {
  const [selectedBreed, setSelectedBreed] = useState(breeds[0]);
  const [selectedAge, setSelectedAge] = useState("Puppy");
  const [selectedSize, setSelectedSize] = useState("Small");

  return (
    <Layout>
      <Head>
        <title>Find a pet</title>
      </Head>
      <div className="bg-zinc-50 flex-col flex-1 h-full">
        <div className="container flex flex-col mx-auto">
          <h1 className="text-3xl text-putple-800 my-10 text-purple-800">
            Find A Pet!
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex flex-1 flex-col">
              <p className="text-xl mb-2">Filter By:</p>{" "}
              <div className="flex flex-col w-90 shadow bg-zinc-50 p-3 rounded-md border border-purple-200">
                <div className="flex w-min self-center ">
                  <button className="flex text-xl items-center bg-purple-500 w-20 rounded-xl px-2 py-1 m-1 text-white">
                    <div className="w-10">
                      <AnimalDog />
                    </div>
                    Dog
                  </button>
                  <button className="flex text-xl items-center bg-purple-500 w-20 rounded-xl px-2 py-1 m-1 text-white">
                    <div className="w-10">
                      <AnimalCat />
                    </div>
                    Cat
                  </button>
                </div>
                <h3 className="text-lg">Breed:</h3>
                <div className="flex bg-white"></div>
                <Listbox value={selectedBreed} onChange={setSelectedBreed}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate">{selectedBreed}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {breeds.map((breed, breedIdx) => (
                          <Listbox.Option
                            key={breedIdx}
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value={breed}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {breed}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <h3 className="text-lg">Age:</h3>
                <div className="relative mt-1">
                  <Listbox value={selectedAge} onChange={setSelectedAge}>
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate">{selectedAge}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Puppy"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Puppy
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Young"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Young
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Adult"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Adult
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Senior"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Senior
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
                <h3 className="text-lg">Size:</h3>
                <div className="relative mt-1">
                  <Listbox value={selectedSize} onChange={setSelectedSize}>
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate">{selectedSize}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Small"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Small (18-25 lbs)
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Medium"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Medium (25-35 lbs)
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Large"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Large (35-55 lbs)
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        <Listbox.Option
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-purple-900 bg-purple-100"
                                : "text-gray-900"
                            }`
                          }
                          value="Extra-Large"
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                Extra Large (55+ lbs)
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      </Listbox.Options>
                    </Transition>
                  </Listbox>
                </div>
              </div>
            </div>
            <div className="flex flex-1 bg-yellow-200">
              <h3 className="text-xl">Results</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default findpet;
