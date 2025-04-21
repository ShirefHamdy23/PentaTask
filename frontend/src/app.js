import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import OrderForm from "./components/OrderForm";
import Recommendations from "./components/Recommendations";
import axios from "axios";

function App() {
  const [analytics, setAnalytics] = useState({});
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/analytics")
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch initial analytics:", err);
      });

    const socket = new WebSocket("ws://localhost:4000");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "analyticsUpdate") {
        setAnalytics(message.data);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Real-Time Sales Analytics</h1>
      <OrderForm />
      <Dashboard analytics={analytics} />
      <Recommendations
        recommendations={recommendations}
        setRecommendations={setRecommendations}
      />
    </div>
  );
}

export default App;
