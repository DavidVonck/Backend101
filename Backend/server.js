// Importeer benodigde modules
import express from 'express'; // Express framework om gemakkelijk met routes te kunnen werken
import cors from 'cors'; // CORS maakt het mogelijk om verzoeken van hetzelfde domein toe te staan (zoals je frontend)
import Database from 'better-sqlite3'; // SQLite database library

const app = express(); // Maak een nieuwe Express-app aan
const port = 3000; // De poort waarop de server zal draaien

// Middleware
app.use(express.json()); // Zorgt ervoor dat je JSON-data van de client kunt uitlezen
app.use(cors()); // Zorgt ervoor dat je frontend-app (bijvoorbeeld localhost:5500) verbinding mag maken met deze server

// Verbind met de SQLite-database (deze wordt aangemaakt als deze nog niet bestaat)
const db = new Database('database.sqlite');

// Endpoint om alle comments op te halen
app.get('/get-comments', (req, res) => {
  try {
    // Selecteer alle rijen uit de comments-tabel, en sorteer ze van nieuw naar oud
    const rows = db.prepare('SELECT * FROM comments ORDER BY timestamp DESC').all();

    // Stuur de rijen terug als JSON naar de client (ander woord voor de frontend)
    res.json(rows);
  } catch (err) {
    // Toon de error in de console waar je je server draaiende hebt
    console.error("Fout bij ophalen:", err.message);
    // Als er iets fout gaat bij het ophalen, stuur een foutmelding terug, probeer altijd een status mee te sturen zodat je op de frontend gemakkelijk de .ok property kunt gebruiken!
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Endpoint om een nieuwe comment toe te voegen
app.post('/insert-comment', (req, res) => {
  // Haal de naam en de tekst op uit het body-object van het verzoek
  const { name, text } = req.body;

  // Toon in de console waar je je server draaiende hebt wat er ontvangen is
  console.log("Nieuwe comment:", req.body);

  // Als naam of tekst ontbreekt, stuur een foutmelding terug
  if (!name || !text) {
    return res.status(400).json({ error: 'Naam en body zijn verplicht.' });
  }

  try {
    // Bereid het SQL-statement voor om een nieuwe comment toe te voegen
    const stmt = db.prepare('INSERT INTO comments (name, body) VALUES (?, ?)');

    // Voer het SQL-statement uit met de meegegeven waarden (op de vraagtekens)
    const result = stmt.run(name, text);

    // Stuur een bevestiging terug met het ID van de nieuwe comment
    res.json({ id: result.lastInsertRowid, message: 'Comment toegevoegd!' });
  } catch (err) {
    // Als er iets fout gaat bij het invoegen, toon een foutmelding
    console.error("Fout bij toevoegen:", err.message);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Endpoint om een comment te verwijderen
app.delete('/delete-comment/:id', (req, res) => {
  // Haal het ID uit de URL (bijvoorbeeld /delete-comment/3 → id = 3)
  const { id } = req.params;
  // const id = req.params.id // dit doet hetzelfde
  
  // Als er geen ID is meegegeven, stuur een foutmelding terug
  if (!id) {
    return res.status(400).json({ error: 'ID is verplicht.' });
  }

  try {
    // Bereid een SQL-statement voor dat de comment met het opgegeven ID verwijdert
    const stmt = db.prepare('DELETE FROM comments WHERE id = ?');

    // Voer het SQL-statement uit
    const result = stmt.run(id);

    // Als er geen rijen zijn aangepast, bestaat de comment niet
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Comment niet gevonden.' });
    }

    // Verstuur de bevestiging terug
    res.status(200).json({ message: 'Comment verwijderd!' });
  } catch (err) {
    // Als er iets mis gaat, toon een foutmelding
    console.error("Fout bij verwijderen:", err.message);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Start de server en laat in de console weten dat hij draait
app.listen(port, () => {
  console.log(`De server draait op port ${port}`);
  console.log(`Gebruik http://localhost:${port}/get-comments om alle comments op te halen`);
});
