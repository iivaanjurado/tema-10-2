import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchedGames } from "../../services/api";

const SearchResults = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Extraer el parámetro de búsqueda de la URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    const loadGames = async () => {
      if (!searchQuery) return;
      const results = await fetchSearchedGames(searchQuery);
      setGames(results);
      setLoading(false);
    };
    loadGames();
  }, [searchQuery]);

  if (loading) return <div className="text-white text-center py-8">Cargando...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold text-yellow-400 text-center my-6">
        Resultados de la búsqueda
      </h2>
      {games.length === 0 ? (
        <p className="text-center text-gray-400">No se encontraron juegos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="text-xl text-white font-semibold mt-2">{game.name}</h3>
              <p className="text-gray-400">⭐ {game.rating}</p>
              <p className="text-gray-500">{game.genres.map(g => g.name).join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
