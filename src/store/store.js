import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import userReducer from '../features/user/userSlice';
import eventsReducer from '../features/events/eventsSlice';


export const store = configureStore({
  reducer: {
    games: gamesReducer,
    user: userReducer,
    events: eventsReducer,
  },
});