import React from "react";

const Spinner: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80px"
  }}>
    <div
      style={{
        width: size,
        height: size,
        border: "6px solid #eee",
        borderTop: "6px solid #1976d2",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}
    />
    <style>
      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Spinner;
