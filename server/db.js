import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Database connecting with:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  hasPassword: process.env.DB_PASSWORD ? 'YES' : 'NO',
  database: process.env.DB_NAME || 'airnetz'
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'airnetz',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
