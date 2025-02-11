
// https://github.com/SpEcHiDe/IMDbOT/wiki
const IMDBOT_API_URL = 'https://search.imdbot.workers.dev/';


export const getMoviesBy = async (keywords) => {
    try {
      const response = await fetch(`${IMDBOT_API_URL}/?q=${keywords}`);
      if (!response.ok) {
        throw new Error(`Error al obtener películas: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ocurrió un error al hacer fetch:", error);
      throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
  };