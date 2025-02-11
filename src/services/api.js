
const API_KEY = "b52f494888cc42fb87e0ce2efc3dc482";
const BASE_URL = "https://api.rawg.io/api";

export const fetchPopularGames = async () => {
  try {
    // Verifica la URL antes de realizar la solicitud
    console.log("Fetching games from URL:", `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`);

    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`
    );

    // Verificamos si la respuesta es válida (status 200 OK)
    if (!response.ok) {
      throw new Error("Error fetching popular games");
    }

    const data = await response.json();

    // Verificamos la estructura de la respuesta
    console.log("API Response Data:", data);

    // Verificamos si la respuesta tiene la propiedad 'results' que es donde están los juegos
    if (!data.results || data.results.length === 0) {
      throw new Error("No games found");
    }

    // Retornamos los juegos
    return data.results;

  } catch (error) {
    // Si ocurre algún error, lo mostramos en consola y retornamos un array vacío
    console.error("Error fetching popular games:", error);
    return [];
  }
};

export const searchGames = async (query) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}`)
  const data = await response.json()
  return data.results
}

export const fetchGameDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
  const data = await response.json()
  return data
}

export const fetchGamesWithPagination = async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/games?ordering=-added&page_size=10&page=${page}&key=${API_KEY}`
      );
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

  export const fetchAllGames = async (page = 1) => {
    try {
      const url = new URL(`${BASE_URL}?key=${API_KEY}`);
      url.searchParams.append("page", page);
      url.searchParams.append("page_size", 20); // Número de juegos por página
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los juegos");
      }
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  //funcion para realizar busquedas
export const fetchSearchedGames = async (searchQuery) => {
  try {
    const url = new URL(`${BASE_URL}?key=${API_KEY}`);
    url.searchParams.append("search", searchQuery);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los juegos");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
