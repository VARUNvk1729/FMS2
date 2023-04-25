const { Pool } = require("pg");
const pool = new Pool({
  user: "financial-tracker",
  host: "database-1.c052vaugaasa.us-east-1.rds.amazonaws.com",
  database: "financial-tracker",
  password: "coldpage65",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
