import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      fontFamily: "Segoe UI, Arial, sans-serif",
      background: "#f5f6fa",
    }}
  >
    <h1 style={{ fontSize: "2.5rem", color: "#d32f2f", marginBottom: "1rem" }}>
      404 - Página no encontrada
    </h1>
    <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "2rem" }}>
      Lo sentimos, la página que buscas no existe.
    </p>
    <Link
      to="/"
      style={{
        color: "#1976d2",
        fontSize: "1.1rem",
        textDecoration: "none",
        border: "1px solid #1976d2",
        padding: "0.5rem 1.2rem",
        borderRadius: "8px",
        background: "#fff",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#1976d2";
        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
        (e.currentTarget as HTMLAnchorElement).style.color = "#1976d2";
      }}
    >
      Volver al listado de películas
    </Link>
  </div>
);

export default NotFound;
