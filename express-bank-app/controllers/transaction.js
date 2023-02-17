// account.js
const express = require("express");
const router = express.Router();

router.get("/api/get-account-transactions/:accountID", (req, res) => {
  const accountID = req.params.accountID;
  const sql =
    "SELECT DATE_FORMAT(time_stamp, '%Y-%m-%d %H:%i:%s') AS time_stamp, debit, credit, amount FROM transactions WHERE debit = ? or credit = ?";
  const values = [accountID, accountID];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Failed to retrieve account information" });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res
        .status(404)
        .send({ message: "No account transactions found for the given user." });
    }
  });
});

router.post("/api/post-account-transaction", (req, res) => {
  const { debit, credit, amount } = req.body;
  const sql = `INSERT INTO transactions (debit, credit, amount, time_stamp)
               VALUES (?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'))`;
  const values = [debit, credit, amount];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to create account transaction" });
      return;
    }
    console.log("Transaction has been successfully posted to the database");
    res.send({
      message: `Transaction has been successfully posted to the database with Debit = ${debit}, Credit = ${credit}, Amount = ${amount}`,
    });
  });
});

module.exports = router;
