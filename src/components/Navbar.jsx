import SearchBar from "./Searchbar"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-yellow-400 hover:text-yellow-500 transition-all duration-300">
          WikGame
        </Link>

        {/* Menú de navegación */}
        <div className="hidden md:flex space-x-8">
          <Link to="/videojuegos" className="text-white hover:text-yellow-400 transition-all duration-300">
            Videojuegos
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="/publishers" className="text-white hover:text-yellow-400 transition-all duration-300">
            Publishers
          </Link>
        </div>

        {/* Barra de Búsqueda */}
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
