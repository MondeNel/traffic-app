import Database from 'better-sqlite3';

// Create in-memory database
const db = new Database(':memory:');

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
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
  );

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
  );

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
  );

  CREATE TABLE IF NOT EXISTS consents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    consent_type TEXT NOT NULL,
    is_granted INTEGER DEFAULT 1,
    granted_date TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info',
    is_read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Create indexes for better query performance
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_id_number ON users(id_number);
  CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
  CREATE INDEX IF NOT EXISTS idx_vehicles_plate ON vehicles(plate_number);
  CREATE INDEX IF NOT EXISTS idx_fines_user_id ON fines(user_id);
  CREATE INDEX IF NOT EXISTS idx_fines_status ON fines(status);
  CREATE INDEX IF NOT EXISTS idx_consents_user_id ON consents(user_id);
  CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
`);

export default db;