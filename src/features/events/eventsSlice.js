// src/features/events/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/events';

export const fetchEventsAsync = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    return await fetchEvents();
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEventsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;