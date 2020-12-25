const Client = require('pg').Client;

const client = new Client({
  user:"postgres",
  password:"yourpassword",
  port: 5432,
  database: "whatsappdata"
});

module.exports = client;
