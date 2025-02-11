import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Videojuegos from "./components/pages/Videojuegos";
import GameDetail from "./components/pages/GameDetail";
import Navbar from "./components/Navbar";
import SearchResults from "./components/pages/SearchResults";
import HomePage from "./components/pages/Home";
import Footer from "./components/Footer";

const AppContent = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Contenido Principal */}
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videojuegos" element={<Videojuegos />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/buscar" element={<SearchResults />} />
          

        </Routes>
      </div>
      <Footer/>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
