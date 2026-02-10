import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOVIES_ENDPOINT } from '../config/api';

export interface Movie {
  id: number;
  title: string;
  year: string;
  plot?: string;
}

interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const populateMovies = createAsyncThunk(
  'movies/populateMovies',
  async () => {
    const res = await fetch(`${MOVIES_ENDPOINT}/populate`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return await res.json();
  }
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const res = await fetch(MOVIES_ENDPOINT);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return await res.json();
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string) => {
    const res = await fetch(`${MOVIES_ENDPOINT}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch movie');
    return await res.json();
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie(state) {
      state.selectedMovie = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(populateMovies.pending, (state => {
        state.loading = true;
        state.error = null;
      }))
      .addCase(populateMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error'
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  }
});

export const { clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
