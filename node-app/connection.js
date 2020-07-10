const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql2.freesqldatabase.com",
  user: "sql2353748",
  password: "qX5*pI9%",
  database: "sql2353748",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("mySQL Connected");
});

module.exports = db;
