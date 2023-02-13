// account.js
const express = require("express");
const router = express.Router();

router.get("/api/get-account-information/:userId", (req, res) => {
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

router.put("/api/update-account/:accountID", (req, res) => {
  const accountID = req.params.accountID;
  const { amount } = req.body;
  const sql = "UPDATE accounts  SET balance = balance + ? WHERE id = ?";
  const values = [amount, accountID];
  req.con.query(sql, values, function (err, result) {
    if (err) {
      res.status(500).send({ message: "Failed to update account" });
    }
    if (result.affectedRow > 0) {
      res
        .status(200)
        .send({
          message: `Account Number ${accountID} updated successfully, value changed by ${amount}`,
        });
    } else {
      res
        .status(404)
        .send({ message: "No account found with the given account ID" });
    }
  });
});

module.exports = router;
