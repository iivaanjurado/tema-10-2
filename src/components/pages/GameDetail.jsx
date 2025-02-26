import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails } from "../../services/api";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadGameDetails = async () => {
      const gameData = await fetchGameDetails(id);
      setGame(gameData);
      setLoading(false);

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.includes(id));
    };

    loadGameDetails();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((gameId) => gameId !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="text-center text-white py-8">Cargando...</div>;
  if (!game) return <div className="text-center text-red-500 py-8">Error al cargar el juego.</div>;

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-full object-cover rounded-lg" />
        <h2 className="text-3xl font-bold text-yellow-400 mt-4">{game.name}</h2>
        <p className="text-gray-400 mt-2">🗓️ Lanzamiento: {game.released}</p>
        <p className="text-gray-400">🎮 Plataformas: {game.platforms.map(p => p.platform.name).join(", ")}</p>
        <p className="text-gray-400">⭐ Puntuación: {game.rating} / 5</p>
        
        {/* Tags clickeables */}
        <div className="text-gray-400 mt-2">
          🏷️ Tags: 
          {game.tags.map((tag) => (
            <Link 
              key={tag.id}
              to={`/games/tag/${tag.id}`}
              className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 hover:bg-gray-600 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
        
        {/* Añadimos el publisher */}
        <p className="text-gray-400">🏢 Publisher: {game.publishers.map(pub => pub.name).join(", ")}</p>
        
        <p className="mt-4">{game.description_raw || "Descripción no disponible."}</p>

        <button
          onClick={toggleFavorite}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${isFavorite ? "bg-red-500" : "bg-green-500"} transition`}
        >
          {isFavorite ? "❤️ Quitar de favoritos" : "💚 Agregar a favoritos"}
        </button>
      </div>
    </div>
  );
};

export default GameDetail;