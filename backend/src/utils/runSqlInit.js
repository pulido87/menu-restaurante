import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlPath = path.resolve(__dirname, '../../sql/init.sql');

const run = async () => {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  await pool.query(sql);
  await pool.end();
  console.log('Database initialized successfully.');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
