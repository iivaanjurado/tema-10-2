import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a202c', color: 'white', padding: '2rem 0', marginTop: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        {/* Enlaces del Footer */}
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fbbf24'} onMouseOut={(e) => e.target.style.color = 'white'}>
            Inicio
          </Link>
          <Link to="/videojuegos" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fbbf24'} onMouseOut={(e) => e.target.style.color = 'white'}>
            Videojuegos
          </Link>
          <Link to="/buscar" style={{ margin: '0 1rem', textDecoration: 'none', color: 'white', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fbbf24'} onMouseOut={(e) => e.target.style.color = 'white'}>
            Buscar
          </Link>
        </div>

        {/* Copyright */}
        <div style={{ color: '#a0aec0' }}>
          <p>&copy; {new Date().getFullYear()} WikGame. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
