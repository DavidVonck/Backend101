import sqlite3 from "sqlite3";
const migrate = async () => {
  const db = new sqlite3.Database("my.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(128) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);

  console.log("✅ Migratie voltooid!");
  db.close();
};

migrate();
