import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Verbind met database
const db = new Database('database.sqlite');

// Haal alle comments op
app.get('/get-comments', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM comments ORDER BY timestamp DESC').all();
    res.json(rows);
  } catch (err) {
    console.error("❌ Fout bij ophalen:", err.message);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Voeg een comment toe
app.post('/insert-comment', (req, res) => {
  const { name, text } = req.body;
  console.log("🚀 Nieuwe comment:", req.body);
  if (!name || !text) {
    return res.status(400).json({ error: 'Naam en body zijn verplicht.' });
  }

  try {
    const stmt = db.prepare('INSERT INTO comments (name, body) VALUES (?, ?)');
    const result = stmt.run(name, text);
    res.json({ id: result.lastInsertRowid, message: '✅ Comment toegevoegd!' });
  } catch (err) {
    console.error("❌ Fout bij toevoegen:", err.message);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Verwijder een comment op basis van ID
app.delete('/delete-comment', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID is verplicht.' });
  }

  try {
    const stmt = db.prepare('DELETE FROM comments WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Comment niet gevonden.' });
    }

    res.json({ message: '✅ Comment verwijderd!' });
  } catch (err) {
    console.error("❌ Fout bij verwijderen:", err.message);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// start de server
app.listen(port, () => {
  console.log(`De server draait op port ${port}\n\nGerbruik http://localhost:${port}/get-comments/ om alle comments op te halen`);
});
