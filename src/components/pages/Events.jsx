import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEventsAsync } from "../../features/events/eventsSlice";
import { toggleEventParticipation } from "../../features/user/userSlice";
import QRCode from "qrcode";

const Events = () => {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.events);
  const { events: userEvents } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEventsAsync());
    }
  }, [dispatch, status]);

  const handleToggleParticipation = (eventId) => {
    dispatch(toggleEventParticipation(eventId));
  };

  const generateQR = async (eventId) => {
    const url = `${window.location.origin}/join-event/${eventId}`;
    const qrCanvas = document.getElementById(`qr-${eventId}`);
  
    if (qrCanvas) {
      qrCanvas.innerHTML = ''; // Limpia el contenido anterior
      const canvas = document.createElement("canvas");
      try {
        await QRCode.toCanvas(canvas, url);
        qrCanvas.appendChild(canvas);
      } catch (error) {
        console.error("Error generando el QR:", error);
      }
    }
  };

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>Cargando eventos...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FBBF24', marginBottom: '1.5rem' }}>Próximos Eventos</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {events.map((event) => {
          const isParticipating = userEvents.includes(event.id);
          
          return (
            <div key={event.id} style={{
              backgroundColor: '#2D3748', // gris oscuro
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{event.title}</h3>
                <p style={{ color: '#E2E8F0', marginBottom: '0.5rem' }}>📍 {event.location}</p>
                <p style={{ marginBottom: '1rem' }}>{event.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => handleToggleParticipation(event.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: isParticipating ? '#9B2C2C' : '#2F855A', // rojo o verde
                    }}
                  >
                    {isParticipating ? "Cancelar participación" : "Apuntarse"}
                  </button>
                  
                  <button
                    onClick={() => generateQR(event.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2B6CB0', // azul
                      borderRadius: '0.5rem',
                    }}
                  >
                    Generar QR
                  </button>
                </div>
                
                <div id={`qr-${event.id}`} style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
