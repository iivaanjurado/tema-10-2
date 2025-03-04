import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllGamesAsync, setCurrentPage } from "../features/games/gamesSlice";

const AllGamesGrid = () => {
  const dispatch = useDispatch();
  const { allGames, status, currentPage } = useSelector((state) => state.games);
  const hasMore = allGames.length > 0; // Asumimos que hay más si recibimos juegos
  const observerRef = useRef(null);

  // Estado para manejar el hover en las tarjetas
  const [hoveredGameId, setHoveredGameId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllGamesAsync(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (!hasMore || status === 'loading') return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      },
      { threshold: 1.0 }
    );

    const observerTarget = document.getElementById("load-more-trigger");
    if (observerTarget) observerRef.current.observe(observerTarget);

    return () => observerRef.current?.disconnect();
  }, [hasMore, status, dispatch, currentPage]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '1.5rem' }}>
        Todos los Juegos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {allGames.map((game) => (
          <Link
            to={`/game/${game.id}`}
            key={game.id}
            onMouseEnter={() => setHoveredGameId(game.id)}
            onMouseLeave={() => setHoveredGameId(null)}
            style={{
              backgroundColor: '#2d3748',
              padding: '1rem',
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 'auto',
              transform: hoveredGameId === game.id ? 'scale(1.05)' : 'scale(1)', // Aumenta el tamaño de la tarjeta cuando el mouse está sobre ella
            }}
          >
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                transition: 'transform 0.3s ease-in-out',
                transform: hoveredGameId === game.id ? 'scale(1.1)' : 'scale(1)', // Escala la imagen cuando el mouse está sobre ella
              }}
            />
            <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>
              {game.name}
            </h3>
            <p style={{ color: '#a0aec0', marginBottom: '0.5rem' }}>⭐ {game.rating}</p>
            <p style={{ color: '#edf2f7' }}>
              {game.genres.map((g) => g.name).join(", ")}
            </p>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div id="load-more-trigger" style={{ textAlign: 'center', padding: '1rem', color: '#fbbf24' }}>
          {status === 'loading' && (
            <>
              <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '3rem', width: '3rem', borderTop: '4px solid #e2e8f0', borderRight: '4px solid transparent' }}></div>
              <p style={{ marginTop: '1rem' }}>Cargando más juegos...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllGamesGrid;
