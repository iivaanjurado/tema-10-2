import { useEffect, useState } from "react";
import { fetchPublishers } from "../services/api";
const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        const data = await fetchPublishers();
        setPublishers(data);
      } finally {
        setLoading(false);
      }
    };

    loadPublishers();
  }, []);

  if (loading) return <div className="text-center text-white py-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Publicadores de Videojuegos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {publishers && publishers.length > 0 ? (
          publishers.map((publisher) => (
            <div 
              key={publisher.id} 
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={publisher.image_background || "/placeholder.svg"}
                alt={publisher.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl text-white font-semibold mb-2">{publisher.name}</h3>
              <p className="text-gray-400">Juegos: {publisher.games_count}</p>
            </div>
          ))
        ) : (
          <p className="text-white">Cargando publishers...</p>
        )}
      </div>
    </div>
  )
}
  
export default Publishers;
