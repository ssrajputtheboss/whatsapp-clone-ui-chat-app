const Pool = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  password:"yourpassword",
  port: 5432,
  database: "whatsappdata"
});

module.exports = pool;
