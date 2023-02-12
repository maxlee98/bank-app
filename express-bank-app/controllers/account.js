// authentication.js
const express = require("express");
const router = express.Router();

router.get("/api/get-account-information", (req, res) => {
  const userId = req.session.userId;
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
      res.status(200).send({ account: result[0] });
    } else {
      res
        .status(404)
        .send({ message: "No account information found for the given user." });
    }
  });
});

module.exports = router;
