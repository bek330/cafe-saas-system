const { Pool } = require('pg');

// Neon requires TLS. Keep certificate verification enabled so the client
// verifies the database server instead of accepting any certificate.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool;
