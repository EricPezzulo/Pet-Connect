import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

interface ListProps {
    type: any
    func: any
    data: any
}
function ListButton({ type, func, data }: ListProps) {
    return (
        <Listbox value={type} onChange={func}>
            <div className="relative mt-1 ">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm">
                    <span className="block truncate">
                        {type === "" ? (
                            <p>All</p>
                        ) : (
                            type
                        )}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon
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
                    
                    <Listbox.Options className="relative w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none text-sm scrollbar-hide">
                    <Listbox.Option
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "text-purple-900 bg-purple-100"
                                  : "text-gray-900"
                              }`
                            }
                            value=""
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  All
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
                        {data.map((breed: any, breedIdx: number) => (
                            <Listbox.Option
                                key={breedIdx}
                                className={({ active }) =>
                                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                                        ? "text-purple-900 bg-purple-100"
                                        : "text-gray-900"
                                    }`
                                }
                                value={breed}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? "font-medium" : "font-normal"
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
    );
}

export default ListButton;