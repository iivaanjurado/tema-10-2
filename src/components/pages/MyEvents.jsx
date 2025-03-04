import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const { events } = useSelector((state) => state.events);
  const { events: userEvents } = useSelector((state) => state.user);
  
  // Filtrar eventos en los que el usuario participa
  const participatingEvents = events.filter(event => userEvents.includes(event.id));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#FBBF24', // amarillo
        marginBottom: '1.5rem'
      }}>
        Mis Eventos
      </h2>
      
      {participatingEvents.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#E2E8F0' }}>No estás apuntado a ningún evento aún.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          {participatingEvents.map((event) => (
            <div key={event.id} style={{
              backgroundColor: '#2D3748', // gris oscuro
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <img 
                src={event.image || "/placeholder.svg"} 
                alt={event.title} 
                style={{
                  width: '100%',
                  height: '12rem',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {event.title}
                </h3>
                <p style={{ color: '#E2E8F0', marginBottom: '0.5rem' }}>📍 {event.location}</p>
                <p style={{ marginBottom: '1rem' }}>{event.description}</p>
                
                <Link 
                  to="/events" 
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#2B6CB0', // azul oscuro
                    borderRadius: '0.5rem',
                    color: 'white',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2C5282'} // hover effect
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2B6CB0'}
                >
                  Ver todos los eventos
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
