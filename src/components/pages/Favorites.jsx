import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGameDetailsAsync } from "../../features/games/gamesSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.user);
  const { allGames, status } = useSelector((state) => state.games);
  
  // Filtrar juegos que están en favoritos
  const favoriteGames = allGames.filter(game => favorites.includes(game.id.toString()));
  
  useEffect(() => {
    // Si no tenemos suficientes juegos cargados, cargar detalles de los favoritos
    if (favoriteGames.length < favorites.length) {
      favorites.forEach(id => {
        dispatch(fetchGameDetailsAsync(id));
      });
    }
  }, [dispatch, favorites, favoriteGames.length]);

  if (status === 'loading' && favoriteGames.length === 0) {
    return <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>Cargando tus favoritos...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FBBF24', marginBottom: '1.5rem' }}>Mis Juegos Favoritos</h2>
      
      {favoriteGames.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#E2E8F0' }}>No tienes juegos favoritos aún.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {favoriteGames.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              style={{
                backgroundColor: '#2D3748',  // gris oscuro
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
            >
              <img
                src={game.background_image || "/placeholder.svg"}
                alt={game.name}
                style={{
                  width: '100%',
                  height: '10rem',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '0.5rem' }}>{game.name}</h3>
              <p style={{ color: '#CBD5E0' }}>⭐ {game.rating}</p>
              <p style={{ color: '#A0AEC0' }}>{game.genres.map(g => g.name).join(", ")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
