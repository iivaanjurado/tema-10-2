import { useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  searchGamesAsync, 
  fetchGamesByTagAsync, 
  setCurrentPage, 
  clearSearchResults, 
  clearTaggedGames,
  setSortCriteria 
} from "../../features/games/gamesSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { searchResults, taggedGames, status, currentPage, sortCriteria } = useSelector((state) => state.games);
  const location = useLocation();
  const { tagId } = useParams();
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const isSearchMode = !!searchQuery;
  let results = isSearchMode ? searchResults.results : taggedGames.results;
  const totalCount = isSearchMode ? searchResults.count : taggedGames.count;
  const totalPages = Math.ceil(totalCount / 20);

  useEffect(() => {
    if (isSearchMode) {
      dispatch(clearTaggedGames());
      dispatch(searchGamesAsync({ query: searchQuery, page: currentPage }));
    } else if (tagId) {
      dispatch(clearSearchResults());
      dispatch(fetchGamesByTagAsync({ tagId, page: currentPage }));
    }
  }, [dispatch, isSearchMode, searchQuery, tagId, currentPage]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [searchQuery, tagId, dispatch]);

  if (results && results.length > 0) {
    results = [...results].sort((a, b) => {
      switch (sortCriteria) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'released':
          return new Date(b.released || 0) - new Date(a.released || 0);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  const handleSortChange = (e) => {
    dispatch(setSortCriteria(e.target.value));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
      window.scrollTo(0, 0);
    }
  };

  if (status === 'loading' && !results.length) return <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Cargando...</div>;

  const title = searchQuery 
    ? `Resultados de la búsqueda: ${searchQuery}` 
    : `Juegos con el tag: ${results[0]?.tags?.find(tag => tag.id === Number(tagId))?.name || 'Sin nombre'}`;

  return (
    <div style={{ backgroundColor: '#1a202c', minHeight: '100vh', color: 'white', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fbbf24', textAlign: 'center', marginBottom: '1.5rem' }}>
        {title}
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <select 
          value={sortCriteria}
          onChange={handleSortChange}
          style={{
            backgroundColor: '#2d3748', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.375rem', 
            border: '1px solid #4a5568'
          }}
        >
          <option value="name">Alfabético (A-Z)</option>
          <option value="released">Fecha de lanzamiento</option>
          <option value="rating">Valoración</option>
        </select>
      </div>
      
      {!results || results.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#cbd5e0' }}>No se encontraron juegos para la búsqueda.</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {results.map((game) => (
              <Link to={`/game/${game.id}`} key={game.id} style={{ backgroundColor: '#2d3748', padding: '1rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s' }}>
                <img src={game.background_image || "/placeholder.svg"} alt={game.name} style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0.375rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'white', fontWeight: '600', marginTop: '0.5rem' }}>{game.name}</h3>
                <p style={{ color: '#cbd5e0' }}>⭐ {game.rating}</p>
                <p style={{ color: '#e2e8f0' }}>{game.genres.map(g => g.name).join(", ")}</p>
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem', 
                borderRadius: '0.375rem', 
                backgroundColor: currentPage === 1 ? '#2d3748' : '#fbbf24', 
                color: 'black', 
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Anterior
            </button>
            <span style={{ color: 'white' }}>Página {currentPage} de {totalPages || 1}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                padding: '0.5rem 1rem', 
                borderRadius: '0.375rem', 
                backgroundColor: currentPage === totalPages || totalPages === 0 ? '#2d3748' : '#fbbf24', 
                color: 'black', 
                cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer'
              }}
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
