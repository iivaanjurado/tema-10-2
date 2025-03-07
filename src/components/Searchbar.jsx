import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setSearchQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2d3748',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s',
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchQuery}
        onChange={handleChange}
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          placeholderColor: '#a0aec0',
          outline: 'none',
          width: '12rem',
          transition: 'all 0.3s',
          borderRadius: '9999px',
        }}
        className="focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="submit"
        style={{
          marginLeft: '0.5rem',
          backgroundColor: '#b7791f',
          color: '#4a4a48',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          transition: 'all 0.3s',
          transform: 'scale(1)',
        }}
        className="hover:bg-yellow-900 hover:scale-105"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
