import { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';

import FilmPoster from '../../components/FilmPoster'

// https://css-tricks.com/design-considerations-text-images/

function Films() {

  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const post = await getMoviesBy("the");
        const { description = [] } = post;
        setFilms(description);
      } catch (error) {
        setError("Ocurrió un error al obtener las películas. Inténtalo de nuevo más tarde.");
        console.error(error);
      }
    };

    fetchMovies();
  }, []);


  //El map no deve llevar corchetes, si lleva corchetas necesita el return para renderizar el componente
  return (
    <section className="">
      <h1 className='font-rubiksh text-gray-200 font-extrabold text-4xl mb-3'>Películas en cartelera</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2  lg:grid-cols-4 ">

        {films?.map((film, key) => 
           <FilmPoster key={key} id={film['#IMDB_ID']} title={film['#AKA']} posterUrl={film['#IMG_POSTER']} />

        )}

      </div>

    </section>
  )
}

export default Films