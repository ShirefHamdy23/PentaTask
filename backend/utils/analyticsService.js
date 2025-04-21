const db = require("../db/database");

function calculateAnalytics(callback) {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) return callback(err);

    const now = new Date();
    const oneMinuteAgo = new Date(now - 60000);
    const recentOrders = rows.filter(
      (order) => new Date(order.date) >= oneMinuteAgo
    );

    const totalRevenue = rows.reduce((acc, o) => acc + o.price * o.quantity, 0);

    const topProducts = rows.reduce((acc, o) => {
      acc[o.productId] = (acc[o.productId] || 0) + o.quantity;
      return acc;
    }, {});

    const ordersCount = recentOrders.length;
    const recentRevenue = recentOrders.reduce(
      (acc, o) => acc + o.price * o.quantity,
      0
    );

    const analytics = {
      totalRevenue,
      topProducts,
      recentRevenue,
      ordersCount,
    };

    callback(null, analytics);
  });
}

function startAnalyticsBroadcastLoop(app) {
  setInterval(() => {
    calculateAnalytics((err, analytics) => {
      if (err) return console.error("Failed to broadcast analytics:", err);
      const broadcast = app.get("broadcast");
      if (broadcast) {
        broadcast({ type: "analyticsUpdate", data: analytics });
      }
    });
  }, 60000);
}

module.exports = {
  calculateAnalytics,
  startAnalyticsBroadcastLoop,
};
