import { useEffect, useState } from "react";
import { fetchPublishers } from "../services/api";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        const data = await fetchPublishers();
        setPublishers(data);
      } finally {
        setLoading(false);
      }
    };

    loadPublishers();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>Cargando...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '1.5rem' }}>Publicadores de Videojuegos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {publishers && publishers.length > 0 ? (
          publishers.map((publisher) => (
            <div 
              key={publisher.id} 
              style={{ backgroundColor: '#2d3748', padding: '1rem', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s', cursor: 'pointer', transform: 'scale(1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <img
                src={publisher.image_background || "/placeholder.svg"}
                alt={publisher.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '0.375rem', marginBottom: '1rem' }}
              />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>{publisher.name}</h3>
              <p style={{ color: '#a0aec0' }}>Juegos: {publisher.games_count}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'white' }}>Cargando publishers...</p>
        )}
      </div>
    </div>
  );
};

export default Publishers;
