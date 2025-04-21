import React from "react";

function Dashboard({ analytics }) {
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "10px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        overflow: "auto",
        fontSize: "15px",
      }}
    >
      <h2>Real-Time Analytics</h2>
      <p>
        <strong>Total Revenue:</strong> ${analytics.totalRevenue || 0}
      </p>
      <p>
        <strong>Orders in Last 1 Minute:</strong> {analytics.ordersCount || 0}
      </p>
      <p>
        <strong>Revenue in Last 1 Minute:</strong> $
        {analytics.recentRevenue || 0}
      </p>

      <h3>Top Products by Sales:</h3>
      <ul>
        {analytics.topProducts &&
          Object.entries(analytics.topProducts).map(([product, qty]) => (
            <li key={product}>
              {product}: {qty} sold
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Dashboard;
