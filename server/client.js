const Client = require('pg').Client;

const client = new Client({
  user:"postgres",
  password:"pkmkb98261",
  port: 5432,
  database: "whatsappdata"
});

module.exports = client;
