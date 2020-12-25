const Pool = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  password:"pkmkb98261",
  port: 5432,
  database: "whatsappdata"
});

module.exports = pool;
