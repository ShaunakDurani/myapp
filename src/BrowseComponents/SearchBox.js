import { useState } from "react";

const Search = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-l focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
