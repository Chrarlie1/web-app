const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./items.db');

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // For serving static files like CSS, JS

// Get all items
app.get('/items', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('index', { items: rows });
  });
});

// Add new item (CREATE)
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare("INSERT INTO items (name, email) VALUES (?, ?)");
  stmt.run([name, description], function(err) {
    if (err) {
      return res.status(500).send("Error adding item.");
    }
    res.redirect('/');
  });
});

// Update item (READE)
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare("UPDATE items SET name = ?, email = ? WHERE id = ?");
  stmt.run([name, description, req.params.id], function(err) {
    if (err) {
      return res.status(500).send("Error updating item.");
    }
    res.redirect('/');
  });
});

// Partially update item (UPDATE)
app.patch('/items/:id', (req, res) => {
  const { name, description } = req.body;
  let updates = [];
  if (name) updates.push(`name = '${name}'`);
  if (description) updates.push(`description = '${description}'`);

  const updateStr = updates.join(', ');
  db.run(`UPDATE items SET ${updateStr} WHERE id = ?`, [req.params.id], function(err) {
    if (err) {
      return res.status(500).send("Error updating item.");
    }
    res.redirect('/');
  });
});

// Delete item (DELETE)
app.delete('/items/:id', (req, res) => {
  const stmt = db.prepare("DELETE FROM items WHERE id = ?");
  stmt.run([req.params.id], function(err) {
    if (err) {
      return res.status(500).send("Error deleting item.");
    }
    res.redirect('/');
  });
});

// Home route - Display items
app.get('/', (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error fetching items.");
    }
    res.render('index', { items: rows });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});