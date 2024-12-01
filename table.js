const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./items.db', (err) => {
  if (err) {
    console.error('Database opening error:', err);
  } else {
    console.log('Database connected.');
  }
});

// Create items table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
)`, (err) => {
  if (err) {
    console.log('Table creation error:', err);
  }
});

module.exports = db;