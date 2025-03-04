// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 1,
    name: 'Usuario Demo',
    avatar: '/avatar.jpg',
  },
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  events: JSON.parse(localStorage.getItem('userEvents')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const gameId = action.payload;
      if (state.favorites.includes(gameId)) {
        state.favorites = state.favorites.filter(id => id !== gameId);
      } else {
        state.favorites.push(gameId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    toggleEventParticipation: (state, action) => {
      const eventId = action.payload;
      if (state.events.includes(eventId)) {
        state.events = state.events.filter(id => id !== eventId);
      } else {
        state.events.push(eventId);
      }
      localStorage.setItem('userEvents', JSON.stringify(state.events));
    },
  },
});

export const { toggleFavorite, toggleEventParticipation } = userSlice.actions;
export default userSlice.reducer;