import { SearchAlt } from "styled-icons/boxicons-regular";

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <label className="relative left-8" htmlFor="searchIcon">
        <div className="w-7 text-gray-600">
          <SearchAlt />
        </div>
      </label>

      <input
        type="text"
        placeholder="Search..."
        className="p-2 pl-8 bg outline-none rounded "
      />
    </div>
  );
};

export default SearchBar;
