const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/sales.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId TEXT,
    temp TEXT,
    quantity INTEGER,
    price REAL,
    date TEXT
  )`);
});

module.exports = db;
