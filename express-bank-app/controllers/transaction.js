// account.js
const express = require("express");
const router = express.Router();

router.get("/api/get-account-transactions/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM transactions WHERE debit = ? or credit = ?";
  const values = [userId, userId];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Failed to retrieve account information" });
    }

    if (result.length > 0) {
      res.send({
        account: result[0].id,
        bankAccountType: result[0].bankAccountType,
        balance: result[0].balance,
      });
    } else {
      res
        .status(404)
        .send({ message: "No account information found for the given user." });
    }
  });
});

router.post("/api/post-account-transaction", (req, res) => {
  const { debit, credit, amount } = req.body;
  const sql = `INSERT INTO transactions (debit, credit, amount, time_stamp)
               VALUES (?, ?, ?, NOW())`;
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
