import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto text-center">
        {/* Enlaces del Footer */}
        <div className="mb-4">
          <Link to="/" className="mx-4 hover:text-yellow-400 transition">
            Inicio
          </Link>
          <Link to="/videojuegos" className="mx-4 hover:text-yellow-400 transition">
            Videojuegos
          </Link>
          <Link to="/buscar" className="mx-4 hover:text-yellow-400 transition">
            Buscar
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-gray-400">
          <p>&copy; {new Date().getFullYear()} WikGame. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
