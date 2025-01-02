const mysql = require("mysql2");

const bd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "awm",
});

bd.connect((err) => {
  if (err) {
    console.log("Error de conexión");
    process.exit(1);
  }
  console.log("Conectado a la BD");
});

module.exports = bd;
