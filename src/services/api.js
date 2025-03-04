const API_KEY = "db6b8e03223a47fbae62b2bf7c0e9ab7";  // Nueva clave de API
const BASE_URL = "https://api.rawg.io/api";

// Función para obtener los juegos populares
export const fetchPopularGames = async () => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=10`;
    console.log("Fetching games from URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching popular games");
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    if (!data.results || data.results.length === 0) {
      throw new Error("No games found");
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching popular games:", error);
    return [];
  }
};

// Función para buscar juegos por consulta
export const searchGames = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);  // Codificar la consulta
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodedQuery}`;
    console.log("Searching games with query:", encodedQuery);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching searched games");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching games:", error);
    return [];
  }
};

// Función para obtener los detalles de un juego
export const fetchGameDetails = async (id) => {
  try {
    const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching game details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return {};
  }
};

// Función para obtener juegos con paginación
export const fetchGamesWithPagination = async (page = 1) => {
  try {
    const url = `${BASE_URL}/games?ordering=-added&page_size=10&page=${page}&key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching games with pagination");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching games with pagination:", error);
    return [];
  }
};

// Función para obtener todos los juegos con paginación
export const fetchAllGames = async (page = 1) => {
  try {
    const url = new URL(`${BASE_URL}/games?ordering=-added&page_size=10&page=${page}&key=${API_KEY}`);
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", 20);  // Número de juegos por página

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching all games");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching all games:", error);
    return [];
  }
};

// Función para buscar juegos por una consulta con paginación
export const fetchSearchedGames = async (query, page = 1) => {
  try {
    const encodedQuery = encodeURIComponent(query);  // Codificar la consulta
    const url = `${BASE_URL}/games?key=${API_KEY}&search=${encodedQuery}&page=${page}&page_size=20`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching searched games");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching searched games:", error);
    return { results: [], count: 0 };
  }
};

// Función para obtener juegos por etiqueta
export const fetchGamesByTag = async (tagId, page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=20`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching games by tag");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games by tag:", error);
    return { results: [], count: 0 };
  }
};

// Función para obtener los publishers
export const fetchPublishers = async () => {
  try {
    const url = `${BASE_URL}/publishers?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching publishers");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching publishers:", error);
    return [];
  }
};
