import initSqlJs from 'sql.js';

let db = null;
let SQL = null;

// Initialize the database
export const initDatabase = async () => {
  if (db) return db;
  
  SQL = await initSqlJs({
    // Use the local WASM file from public folder
    locateFile: file => `/${file}`
  });
  
  // Try to load existing database from localStorage
  const savedDb = localStorage.getItem('trafficlens_db');
  
  if (savedDb) {
    db = new SQL.Database(new Uint8Array(JSON.parse(savedDb)));
  } else {
    db = new SQL.Database();
  }
  
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      id_number TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      date_of_birth TEXT,
      license_number TEXT,
      license_expiry TEXT,
      vehicle_codes TEXT DEFAULT 'B',
      role TEXT DEFAULT 'citizen',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plate_number TEXT UNIQUE NOT NULL,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER,
      engine TEXT,
      disc_expiry TEXT,
      registered_date TEXT,
      status TEXT DEFAULT 'active',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS fines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      vehicle_id INTEGER,
      fine_type TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL,
      location TEXT,
      issued_date TEXT,
      due_date TEXT,
      status TEXT DEFAULT 'unpaid',
      paid_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS consents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      consent_type TEXT NOT NULL,
      is_granted INTEGER DEFAULT 1,
      granted_date TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT,
      type TEXT DEFAULT 'info',
      is_read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  
  // Save database to localStorage whenever it changes
  saveDatabase();
  
  return db;
};

// Save database state to localStorage
const saveDatabase = () => {
  if (db) {
    const data = db.export();
    const array = Array.from(data);
    localStorage.setItem('trafficlens_db', JSON.stringify(array));
  }
};

// Get database instance (must be initialized first)
export const getDatabase = () => {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
};

// Helper to run queries and return results
export const query = (sql, params = []) => {
  const database = getDatabase();
  
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    const results = [];
    const stmt = database.prepare(sql);
    stmt.bind(params);
    
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    
    stmt.free();
    return results;
  } else {
    database.run(sql, params);
    saveDatabase(); // Save after modifications
    return database.getRowsModified();
  }
};

// Get last inserted ID
export const getLastInsertId = () => {
  const database = getDatabase();
  const result = database.exec('SELECT last_insert_rowid() as id');
  return result[0]?.values[0][0];
};

export default { initDatabase, getDatabase, query, getLastInsertId };