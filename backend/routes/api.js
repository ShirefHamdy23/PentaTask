const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { getRecommendations } = require("../utils/aiService");
const { getWeatherInfo } = require("../utils/weatherService");
const { calculateAnalytics } = require("../utils/analyticsService");

router.post("/orders", (req, res) => {
  const { productId, quantity, price, date, temp } = req.body;

  if (!productId || quantity == null || price == null || !date || !temp) {
    return res.status(400).json({ error: "Missing required order fields." });
  }

  db.run(
    `INSERT INTO orders (productId, temp, quantity, price, date) VALUES (?, ?, ?, ?, ?)`,
    [productId, temp, quantity, price, date],
    function (err) {
      if (err) {
        console.error("Database insert error:", err.message);
        return res.status(500).json({ error: err.message });
      }

      const newOrder = {
        id: this.lastID,
        productId,
        temp,
        quantity,
        price,
        date,
      };

      const broadcast = req.app.get("broadcast");
      if (broadcast) {
        broadcast({ type: "newOrder", data: newOrder });


        calculateAnalytics((err, analytics) => {
          if (!err) {
            broadcast({ type: "analyticsUpdate", data: analytics });
          }
        });
      }

      res.status(201).json(newOrder);
    }
  );
});

router.get("/analytics", (req, res) => {
  calculateAnalytics((err, analytics) => {
    if (err) return res.status(500).json({ error: err.message });

    const broadcast = req.app.get("broadcast");
    if (broadcast) {
      broadcast({ type: "analyticsUpdate", data: analytics });
    }

    res.json(analytics);
  });
});

router.get("/recommendations", async (req, res) => {
  db.all(`SELECT * FROM orders`, [], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const weather = await getWeatherInfo();
    const recommendations = await getRecommendations(rows, weather);
    res.json(recommendations);
  });
});

module.exports = router;
