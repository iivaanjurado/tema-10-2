import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchPopularGames, 
  fetchGameDetails, 
  fetchAllGames, 
  fetchSearchedGames, 
  fetchGamesByTag,
  fetchPublishers
} from '../../services/api';

// Thunks
export const fetchPopularGamesAsync = createAsyncThunk(
  'games/fetchPopularGames',
  async () => {
    return await fetchPopularGames();
  }
);

export const fetchGameDetailsAsync = createAsyncThunk(
  'games/fetchGameDetails',
  async (id) => {
    return await fetchGameDetails(id);
  }
);

export const fetchAllGamesAsync = createAsyncThunk(
  'games/fetchAllGames',
  async (page) => {
    return await fetchAllGames(page);
  }
);

export const searchGamesAsync = createAsyncThunk(
  'games/searchGames',
  async ({ query, page = 1 }) => {
    return await fetchSearchedGames(query, page);
  }
);

export const fetchGamesByTagAsync = createAsyncThunk(
  'games/fetchGamesByTag',
  async ({ tagId, page = 1 }) => {
    return await fetchGamesByTag(tagId, page);
  }
);

export const fetchPublishersAsync = createAsyncThunk(
  'games/fetchPublishers',
  async () => {
    return await fetchPublishers();
  }
);

// Slice
const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    popularGames: [],
    allGames: [],
    currentGame: null,
    searchResults: { results: [], count: 0 },
    taggedGames: { results: [], count: 0 },
    publishers: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentPage: 1,
    sortCriteria: 'name', // Valores posibles: 'name', 'released', 'rating'
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearGames: (state) => {
      state.allGames = [];
    },
    clearSearchResults: (state) => {
      state.searchResults = { results: [], count: 0 };
    },
    clearTaggedGames: (state) => {
      state.taggedGames = { results: [], count: 0 };
    },
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Games
      .addCase(fetchPopularGamesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularGamesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popularGames = action.payload;
      })
      .addCase(fetchPopularGamesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Game Details
      .addCase(fetchGameDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameDetailsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGame = action.payload;
        
        // Añadir el juego a allGames si no existe ya
        const exists = state.allGames.some(game => game.id === action.payload.id);
        if (!exists) {
          state.allGames.push(action.payload);
        }
      })
      .addCase(fetchGameDetailsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // All Games
      .addCase(fetchAllGamesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllGamesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allGames = [...state.allGames, ...action.payload];
      })
      .addCase(fetchAllGamesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Search Games
      .addCase(searchGamesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchGamesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchGamesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Games By Tag
      .addCase(fetchGamesByTagAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGamesByTagAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.taggedGames = action.payload;
      })
      .addCase(fetchGamesByTagAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Publishers
      .addCase(fetchPublishersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPublishersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publishers = action.payload;
      })
      .addCase(fetchPublishersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, clearGames, clearSearchResults, clearTaggedGames, setSortCriteria } = gamesSlice.actions;

export default gamesSlice.reducer;