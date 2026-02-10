import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, populateMovies } from "../store/moviesSlice";
import type { AppDispatch, RootState } from "../store";

function formatYear(dateString: string) {
  // Only show the year part
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.getFullYear();
}

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies,
  );

  const [titleFilter, setTitleFilter] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const navigate = useNavigate();

  // Fetch movies when button is clicked
  const handleFetchMovies = () => {
    console.log("debug");
    dispatch(fetchMovies());
  };

  const handleRowClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  // Inside your MovieList component, above the table
  const handlePopulateMoviesOnServer = async () => {
    await dispatch(populateMovies());
    dispatch(fetchMovies());

  };


  useEffect(() => {
    handleFetchMovies();
  }, []);

  // Filtering logic
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const movieYear = Number(formatYear(movie.year));
    const from = yearFrom ? Number(yearFrom) : undefined;
    const to = yearTo ? Number(yearTo) : undefined;
    const matchesYear =
      (!from || movieYear >= from) && (!to || movieYear <= to);
    return matchesTitle && matchesYear;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "#f5f6fa",
        padding: "0 1rem",
        width: "50%",
      }}
    >
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            margin: 0,
            fontWeight: 700,
            color: "#222",
          }}
        >
          Lista de Películas
        </h1>
        <p style={{ color: "#555", fontSize: "1.2rem", marginTop: "0.7rem" }}>
          Explora las películas y haz clic en una fila para ver detalles.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginBottom: "1.5rem",
          justifyContent: "center",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          placeholder="Filtrar por título"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "60%",
            minWidth: "120px",
          }}
        />
        <input
          type="text"
          placeholder="Año desde"
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value.replace(/[^0-9]/g, ""))}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "20%",
            minWidth: "80px",
          }}
          maxLength={4}
        />
        <input
          type="text"
          placeholder="Año hasta"
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value.replace(/[^0-9]/g, ""))}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "20%",
            minWidth: "80px",
          }}
          maxLength={4}
        />
      </div>
      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            overflowX: "auto",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            borderRadius: "18px",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "100%",

            }}
          >
            <button
              onClick={handlePopulateMoviesOnServer}
              style={{
                padding: "0.7rem 1.2rem",
                borderRadius: "8px",
                border: "none",
                background: "#52c41a",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                width: '100%'
              }}
            >
              Obtener películas de OMDB
            </button>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "1.15rem",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#fff",
              margin: "0 auto",
            }}
          >
            <thead>
              <tr style={{ background: "#f7f7f7" }}>
                <th
                  style={{
                    borderBottom: "2px solid #e0e0e0",
                    padding: "1.5rem",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    letterSpacing: "0.02em",
                    color: "#333",
                  }}
                >
                  Id
                </th>
                <th
                  style={{
                    borderBottom: "2px solid #e0e0e0",
                    padding: "1.5rem",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    letterSpacing: "0.02em",
                    color: "#333",
                  }}
                >
                  Título
                </th>
                <th
                  style={{
                    borderBottom: "2px solid #e0e0e0",
                    padding: "1.5rem",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "#333",
                  }}
                >
                  Año
                </th>
                <th
                  style={{
                    borderBottom: "2px solid #e0e0e0",
                    padding: "1.5rem",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "#333",
                  }}
                >
                  Sinopsis
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#888",
                      fontSize: "1.2rem",
                    }}
                  >
                    No se encontraron películas.
                  </td>
                </tr>
              )}
              {filteredMovies.map((movie, idx) => (
                <tr
                  key={movie.id}
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    background: idx % 2 === 0 ? "#fafbfc" : "#fff",
                    transition: "background 0.2s",
                  }}
                  onClick={() => handleRowClick(movie.id)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#e6f7ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      idx % 2 === 0 ? "#fafbfc" : "#fff")
                  }
                >
                  <td
                    style={{
                      padding: "1.5rem",
                      fontWeight: 500,
                      color: "#222",
                      fontSize: "1.15rem",
                    }}
                  >
                    {movie.id}
                  </td>
                  <td
                    style={{
                      padding: "1.5rem",
                      fontWeight: 500,
                      color: "#222",
                      fontSize: "1.15rem",
                    }}
                  >
                    {movie.title}
                  </td>
                  <td
                    style={{
                      padding: "1.5rem",
                      color: "#555",
                      fontSize: "1.15rem",
                    }}
                  >
                    {formatYear(movie.year)}
                  </td>
                  <td
                    style={{
                      padding: "1.5rem",
                      color: "#444",
                      fontSize: "1.15rem",
                    }}
                  >
                    {movie.plot ? (
                      <>
                        {movie.plot.length > 80
                          ? movie.plot.slice(0, 80) + "…"
                          : movie.plot}
                      </>
                    ) : (
                      <em style={{ color: "#bbb" }}>Sin sinopsis</em>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovieList;
