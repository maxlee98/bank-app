// account.js
const express = require("express");
const router = express.Router();

router.get("/api/get-account-information-user/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM accounts WHERE userId = ?";
  const values = [userId];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Failed to retrieve account information" });
    }

    if (result.length > 0) {
      res.send({
        id: result[0].id,
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

router.get("/api/get-account-information-account/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  const sql = "SELECT * FROM accounts WHERE id = ?";
  const values = [accountId];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ message: "Failed to retrieve account information" });
    }

    if (result.length > 0) {
      res.send({
        userId: result[0].userId,
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

router.put("/api/update-account-credit/:creditAccount", (req, res) => {
  const creditAccount = req.params.creditAccount;
  const { creditAmount } = req.body;
  const sql = "UPDATE accounts  SET balance = balance + ? WHERE id = ?";
  console.log(
    `UPDATE accounts  SET balance = balance + ${creditAmount} WHERE id = ${creditAccount}`
  );
  const values = [creditAmount, creditAccount];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      res.status(500).send({ message: "Failed to update account" });
    }
    if (result.affectedRows > 0) {
      res.status(200).send({
        message: `Account Number ${creditAccount} updated successfully, value changed by ${creditAmount}`,
      });
    } else {
      res
        .status(404)
        .send({ message: "No account found with the given account ID" });
    }
  });
});

router.put("/api/update-account-debit/:debitAccount", (req, res) => {
  const debitAccount = req.params.debitAccount;
  const { debitAmount } = req.body;
  const sql = "UPDATE accounts  SET balance = balance - ? WHERE id = ?";
  const values = [debitAmount, debitAccount];
  console.log(
    `UPDATE accounts  SET balance = balance - ${debitAmount} WHERE id = ${debitAccount}`
  );
  req.con.query(sql, values, function (err, result) {
    if (err) {
      res.status(500).send({ message: "Failed to update account" });
    }
    if (result.affectedRows > 0) {
      res.status(200).send({
        message: `Account Number ${debitAccount} updated successfully, value changed by ${debitAmount}`,
      });
    } else {
      res
        .status(404)
        .send({ message: "No account found with the given account ID" });
    }
  });
});

router.delete("/api/delete-account/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const sql =
    "DELETE a, u FROM accounts a JOIN users u ON  a.userId = u.id WHERE a.userId = ?";
  const values = [userId];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to delete the account" });
      return;
    }
    console.log("Bank Account has been successfully deleted from the database");
    res.send({ message: "Bank Account has been deleted successfully" });
  });
});

module.exports = router;
