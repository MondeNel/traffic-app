import bcrypt from 'bcryptjs';
import { query, getLastInsertId } from './database';

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
  const existingUsers = query('SELECT id FROM users WHERE email = ? OR id_number = ?', [email, idNumber]);
  if (existingUsers.length > 0) {
    throw new Error('User with this email or ID number already exists');
  }

  const passwordHash = await hashPassword(password);
  
  query(`
    INSERT INTO users (first_name, last_name, id_number, email, password_hash, phone, address, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [firstName, lastName, idNumber, email, passwordHash, phone, address, dateOfBirth]);
  
  return getLastInsertId();
};

export const authenticateUser = async (email, password) => {
  const users = query('SELECT * FROM users WHERE email = ?', [email]);
  
  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = users[0];
  const isValid = await verifyPassword(password, user.password_hash);
  
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Don't return password hash
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserById = (userId) => {
  const users = query('SELECT * FROM users WHERE id = ?', [userId]);
  if (users.length > 0) {
    const { password_hash, ...userWithoutPassword } = users[0];
    return userWithoutPassword;
  }
  return null;
};