import mysql from "mysql2";

const PORT=3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3007",
  database: "proyecto_final",
});

export {PORT, db};