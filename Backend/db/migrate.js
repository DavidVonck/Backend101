import Database from 'better-sqlite3';
const db = new Database('database.sqlite');

(async () => {
  try {
    // Tabel aanmaken
    db.prepare(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        body TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `).run();

    console.log('✅ Tabel aangemaakt!');

    // invoeren eerste comment
    const insert = db.prepare('INSERT INTO comments (name, body) VALUES (?, ?)');
    const result = insert.run('Eerste comment', 'Dit is een de eerste comment!');

    console.log(`✅ Record toegevoegd met id ${result.lastInsertRowid}`);

  } catch (error) {
    // er is ergens iets mis gegaan in de try
    console.log('❌ Er is iets fout gegaan!');
    console.error(error);
  }
})();
