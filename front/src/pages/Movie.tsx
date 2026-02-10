import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById, clearSelectedMovie } from "../store/moviesSlice";
import type { AppDispatch, RootState } from "../store";
import Spinner from "../components/Spinner";
import { useParams, Link } from "react-router-dom";

const MoviePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { selectedMovie, loading, error } = useSelector(
    (state: RootState) => state.movies,
  );

  // Fetch movie when button is clicked
  const handleFetchMovie = () => {
    if (id) dispatch(fetchMovieById(id));
  };

  // Clear selected movie when leaving page
  const handleClear = () => {
    dispatch(clearSelectedMovie());
  };

  function formatYear(dateString: string) {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.getFullYear();
  }

  useEffect(() => {
    handleFetchMovie();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        background: "#f5f6fa",
        width: "100%",
      }}
    >
      <div style={{ width: "100%" }}>
        <Link
          to="/"
          onClick={handleClear}
          style={{ textDecoration: "none", color: "#0074d9" }}
        >
          &larr; Volver al listado de películas
        </Link>
        <h1 style={{ textAlign: "center" }}>Detalle de la película</h1>
        {loading && <Spinner />}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
        )}
        {selectedMovie && (
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "1.5rem",
              background: "#fafafa",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{selectedMovie.title}</h2>
            <div
              style={{
                color: "#555",
                textAlign: "center",
              }}
            >
              <strong>Año:</strong> {formatYear(selectedMovie.year)}
            </div>
            {selectedMovie.plot && (
              <div>
                <strong>Sinopsis:</strong>
                <p style={{ textAlign: "center" }}>{selectedMovie.plot}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
