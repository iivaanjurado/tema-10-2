import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameDetailsAsync } from "../../features/games/gamesSlice";
import { toggleFavorite } from "../../features/user/userSlice";

const GameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, status } = useSelector((state) => state.games);
  const { favorites } = useSelector((state) => state.user);
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    dispatch(fetchGameDetailsAsync(id));
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  if (status === 'loading' || !currentGame) return <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>Cargando...</div>;
  if (status === 'failed') return <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Error al cargar el juego.</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#2D3748',  // gris oscuro
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <img
          src={currentGame.background_image || "/placeholder.svg"}
          alt={currentGame.name}
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: '0.5rem',
          }}
        />
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FBBF24', marginTop: '1rem' }}>
          {currentGame.name}
        </h2>
        <p style={{ color: '#E2E8F0', marginTop: '0.5rem' }}>🗓️ Lanzamiento: {currentGame.released}</p>
        <p style={{ color: '#E2E8F0' }}>🎮 Plataformas: {currentGame.platforms.map(p => p.platform.name).join(", ")}</p>
        <p style={{ color: '#E2E8F0' }}>⭐ Puntuación: {currentGame.rating} / 5</p>
        
        {/* Tags clickeables */}
        <div style={{ color: '#E2E8F0', marginTop: '0.5rem' }}>
          🏷️ Tags: 
          {currentGame.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/games/tag/${tag.id}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#4A5568', // gris oscuro
                borderRadius: '1rem',
                padding: '0.25rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#E2E8F0',
                marginRight: '0.5rem',
                marginBottom: '0.5rem',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2D3748'}  // hover effect
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4A5568'}
            >
              {tag.name}
            </Link>
          ))}
        </div>
        
        <p style={{ color: '#E2E8F0' }}>🏢 Publisher: {currentGame.publishers.map(pub => pub.name).join(", ")}</p>
        
        <p style={{ marginTop: '1rem' }}>
          {currentGame.description_raw || "Descripción no disponible."}
        </p>

        <button
          onClick={handleToggleFavorite}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            color: 'white',
            backgroundColor: isFavorite ? '#9B2C2C' : '#38A169',  // rojo o verde
            transition: 'background-color 0.3s ease',
          }}
        >
          {isFavorite ? "❤️ Quitar de favoritos" : "💚 Agregar a favoritos"}
        </button>
      </div>
    </div>
  );
};

export default GameDetail;
