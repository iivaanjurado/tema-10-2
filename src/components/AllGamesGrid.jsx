import { useEffect, useState, useRef } from "react";
import { fetchAllGames } from "../services/api";
import { Link } from "react-router-dom";

const AllGamesGrid = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const loadGames = async () => {
      const newGames = await fetchAllGames(page);
      if (newGames.length === 0) {
        setHasMore(false);
      } else {
        setGames((prevGames) => [...prevGames, ...newGames]);
      }
    };
    loadGames();
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const observerTarget = document.getElementById("load-more-trigger");
    if (observerTarget) observerRef.current.observe(observerTarget);

    return () => observerRef.current?.disconnect();
  }, [hasMore]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Todos los Juegos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <Link
            to={`/game/${game.id}`}
            key={game.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-40 object-cover rounded-lg mb-4 transition-all duration-500 ease-in-out transform hover:scale-110"
            />
            <h3 className="text-xl text-white font-semibold mb-2 transition-all duration-300">{game.name}</h3>
            <p className="text-gray-400 mb-2">⭐ {game.rating}</p>
            <p className="text-gray-500">{game.genres.map((g) => g.name).join(", ")}</p>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div id="load-more-trigger" className="text-center py-4 text-yellow-400">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500 border-solid"></div>
          <p className="mt-2">Cargando más juegos...</p>
        </div>
      )}
    </div>
  );
};

export default AllGamesGrid;
