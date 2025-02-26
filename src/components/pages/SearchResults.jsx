import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { fetchSearchedGames, fetchGamesByTag } from "../../services/api";

const SearchResults = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const { tagId } = useParams();
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      let results;
      let totalCount;

      if (searchQuery) {
        const data = await fetchSearchedGames(searchQuery, currentPage);
        results = data.results;
        totalCount = data.count;
      } else if (tagId) {
        const data = await fetchGamesByTag(tagId, currentPage);
        results = data.results;
        totalCount = data.count;
      }

      setGames(results);
      setTotalPages(Math.ceil(totalCount / 20)); // Asumiendo 20 juegos por página
      setLoading(false);
    };

    loadGames();
  }, [searchQuery, tagId, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <div className="text-white text-center py-8">Cargando...</div>;

  const title = searchQuery 
    ? `Resultados de la búsqueda: ${searchQuery}` 
    : `Juegos con el tag: ${games[0]?.tags.find(tag => tag.id === Number(tagId))?.name || ''}`;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold text-yellow-400 text-center my-6">
        {title}
      </h2>
      {games.length === 0 ? (
        <p className="text-center text-gray-400">No se encontraron juegos.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-xl text-white font-semibold mt-2">{game.name}</h3>
                <p className="text-gray-400">⭐ {game.rating}</p>
                <p className="text-gray-500">{game.genres.map(g => g.name).join(", ")}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? 'bg-gray-600 text-black' : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              Anterior
            </button>
            <span className="text-white">Página {currentPage} de {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? 'bg-gray-600 text-black' : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;