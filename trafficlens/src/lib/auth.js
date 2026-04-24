import bcrypt from 'bcryptjs';
import db from './database';

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createUser = async (userData) => {
  const { firstName, lastName, idNumber, email, password, phone, address, dateOfBirth } = userData;
  
  // Check if user already exists
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ? OR id_number = ?').get(email, idNumber);
  if (existingUser) {
    throw new Error('User with this email or ID number already exists');
  }

  const passwordHash = await hashPassword(password);
  
  const stmt = db.prepare(`
    INSERT INTO users (first_name, last_name, id_number, email, password_hash, phone, address, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(firstName, lastName, idNumber, email, passwordHash, phone, address, dateOfBirth);
  
  return result.lastInsertRowid;
};

export const authenticateUser = async (email, password) => {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Don't return password hash
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserById = (userId) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (user) {
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};