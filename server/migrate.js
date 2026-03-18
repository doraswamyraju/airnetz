import pool from './db.js';

async function migrate() {
  try {
    console.log('Starting database migration...');
    const queries = [
      "ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL;",
      "ALTER TABLE users ADD COLUMN location VARCHAR(255) NULL;",
      "ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;"
    ];

    for (const query of queries) {
      try {
        await pool.query(query);
        console.log(`Executed: ${query}`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`Column already exists, skipping: ${query}`);
        } else {
          console.error(`Error executing ${query}:`, err.message);
        }
      }
    }
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrate();
