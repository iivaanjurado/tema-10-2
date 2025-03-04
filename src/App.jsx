import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/Home";
import GameDetail from "./components/pages/GameDetail";
import SearchResults from "./components/pages/SearchResults";
import AllGamesGrid from "./components/AllGamesGrid";
import Favorites from "./components/pages/Favorites";
import Events from "./components/pages/Events";
import MyEvents from "./components/pages/MyEvents";
import JoinEvent from "./components/pages/JoinEvent";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/games/tag/:tagId" element={<SearchResults />} />
        <Route path="/games" element={<AllGamesGrid />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/join-event/:eventId" element={<JoinEvent />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App; 