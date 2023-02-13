// authentication.js
const express = require("express");
const router = express.Router();
const account = require("./account");

router.post("/api/register-account", (req, res) => {
  const data = req.body;
  const emailExistsSql = `SELECT * FROM users WHERE email = ?`;
  const values = [data.email];

  req.con.query(emailExistsSql, values, (err, result) => {
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

    req.con.query(sql, insertValues, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data was successfully written to the database");

      const userId = result.insertId;
      const accountData = [userId, data.bankAccountType, 0];

      const sql_acc = `INSERT INTO accounts (userId, bankAccountType, balance)
      VALUES (?, ?, ?)`;

      req.con.query(sql_acc, accountData, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Account Type was successfully written to the database");
        res.send({
          message: `Successfully registered and created bankAccountType account`,
        });
      });
    });
  });
});

router.post("/api/authenticate", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const values = [email, password];
  req.con.query(sql, values, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      req.session.userId = result[0].id;
      res.status(200).send({
        success: true,
        message: "Authentication successful!",
        userId: result[0].id,
        firstName: result[0].firstName,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Authentication failed. Invalid username or password.",
      });
    }
  });
});

module.exports = router;
