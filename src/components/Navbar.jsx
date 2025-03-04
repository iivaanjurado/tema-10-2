import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./Searchbar";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <nav style={{ backgroundColor: '#2d3748', color: 'white', padding: '1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'white', transition: 'transform 0.3s' }} 
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} 
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'} >
          GameHub
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={linkStyle}>
            Inicio
          </Link>
          <Link to="/games" style={linkStyle}>
            Juegos
          </Link>
          <Link to="/events" style={linkStyle}>
            Eventos
          </Link>

          <SearchBar />

          {/* Dropdown para el usuario */}
          <div style={{ position: 'relative', display: 'inline-block' }} className="group">
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.3s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} 
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'} >
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span>{user.name}</span>
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/favorites" style={dropdownLinkStyle}>
                Mis Favoritos
              </Link>
              <Link to="/my-events" style={dropdownLinkStyle}>
                Mis Eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  transition: 'color 0.3s, transform 0.3s',
  padding: '0.5rem',
  fontSize: '1rem',
  fontWeight: '500',
};

const dropdownLinkStyle = {
  display: 'block',
  padding: '0.5rem 1rem',
  textDecoration: 'none',
  color: 'white',
  transition: 'background-color 0.3s, transform 0.3s',
};

export default Navbar;
