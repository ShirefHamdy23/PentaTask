import React from "react";
import axios from "axios";

function Recommendations({ recommendations, setRecommendations }) {
  const fetchRecommendations = async () => {
    const res = await axios.get("http://localhost:4000/api/recommendations");
    setRecommendations(res.data);
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "10px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        overflow: "auto",
      }}
    >
      <h2>AI Recommendations</h2>
      <button
        style={{
          cursor: "pointer",
          border: "2px solid #ccc",
          borderRadius: "10px",
        }}
        onClick={fetchRecommendations}
      >
        Get Recommendations
      </button>
      <pre>{recommendations || "No recommendations yet."}</pre>
    </div>
  );
}

export default Recommendations;
