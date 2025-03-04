import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPopularGamesAsync } from "../features/games/gamesSlice";

const PopularGamesSlider = () => {
  const dispatch = useDispatch();
  const { popularGames, status } = useSelector((state) => state.games);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchPopularGamesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (popularGames.length === 0) return;

    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularGames.length);
    }, 5000);

    return () => clearInterval(id); // Limpiar intervalo al desmontarse
  }, [popularGames.length]);

  const nextSlide = () => {
    if (popularGames.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % popularGames.length);
  };

  const prevSlide = () => {
    if (popularGames.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + popularGames.length) % popularGames.length);
  };

  if (status === 'loading' || popularGames.length === 0) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  return (
    <div className="relative container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6 text-white text-center tracking-wider">Juegos Populares</h2>

      {/* Contenedor del Slider */}
      <div className="relative w-full" style={{ height: "70vh" }}>
        {/* Imagen visible */}
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
          <img
            src={popularGames[currentIndex].background_image || "/placeholder.svg"}
            alt={popularGames[currentIndex].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <Link to={`/game/${popularGames[currentIndex].id}`} className="text-white text-3xl font-semibold hover:underline transition-all duration-300">
              {popularGames[currentIndex].name}
            </Link>
          </div>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full hover:bg-opacity-70 transition-all duration-300 shadow-lg"
        >
          &lt; Anterior
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full hover:bg-opacity-70 transition-all duration-300 shadow-lg"
        >
          Siguiente &gt;
        </button>

        {/* Paginación */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {popularGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-5 h-5 rounded-full ${currentIndex === index ? "bg-white scale-125" : "bg-gray-500 hover:bg-white hover:scale-110 transition-all duration-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGamesSlider;
