const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testDBConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión correcta a PostgreSQL");
    console.log("Hora del servidor:", res.rows[0]);
  } catch (error) {
    console.error("Error al conectar a PostgreSQL:", error.message);
  }
}

module.exports = {
  pool,
  testDBConnection,
};