const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password2@",
  database: "bank-app-schema",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register-account", (req, res) => {
  const data = req.body;
  const emailExistsSql = `SELECT * FROM users WHERE email = ?`;
  const values = [data.email];

  con.query(emailExistsSql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to register account" });
      return;
    }

    if (result.length > 0) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }

    const sql = `INSERT INTO users (firstName, lastName, email, password, bankAccountType)
                 VALUES (?, ?, ?, ?, ?)`;
    const insertValues = [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.bankAccountType,
    ];

    con.query(sql, insertValues, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to register account" });
        return;
      }
      console.log("Data was successfully written to the database");
      res.send({ message: "Successfully registered account" });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
