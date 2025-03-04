import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventsAsync } from "../../features/events/eventsSlice";
import { toggleEventParticipation } from "../../features/user/userSlice";

const JoinEvent = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, status } = useSelector((state) => state.events);
  const { events: userEvents } = useSelector((state) => state.user);
  
  const event = events.find(e => e.id.toString() === eventId);
  const isParticipating = userEvents.includes(parseInt(eventId));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEventsAsync());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (event && !isParticipating) {
      dispatch(toggleEventParticipation(parseInt(eventId)));
    }
  }, [dispatch, event, eventId, isParticipating]);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>Cargando...</div>;
  }

  if (!event) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Evento no encontrado.</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#2D3748', // gris oscuro
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#FBBF24', // amarillo
          marginBottom: '1rem'
        }}>
          ¡Te has unido al evento!
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <img 
            src={event.image || "/placeholder.svg"} 
            alt={event.title} 
            style={{
              width: '100%',
              height: '16rem',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
        </div>
        
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          {event.title}
        </h3>
        <p style={{ color: '#E2E8F0', marginBottom: '0.5rem' }}>📍 {event.location}</p>
        <p style={{ marginBottom: '1.5rem' }}>{event.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/my-events')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2F855A', // verde oscuro
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#276749'} // hover effect
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2F855A'}
          >
            Ver mis eventos
          </button>
          
          <button
            onClick={() => navigate('/events')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2B6CB0', // azul oscuro
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2C5282'} // hover effect
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2B6CB0'}
          >
            Ver todos los eventos
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinEvent;
