import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setSearchQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/buscar?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form
      className="flex items-center bg-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchQuery}
        onChange={handleChange}
        className="bg-transparent text-white placeholder-gray-400 outline-none w-48 sm:w-64 md:w-80 transition-all duration-300 focus:ring-2 focus:ring-yellow-400 rounded-full"
      />
      <button
        type="submit"
        className="ml-2 bg-yellow-800 text-gray-700 px-6 py-3 rounded-full hover:bg-yellow-900 transition-all duration-300 transform hover:scale-105"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
