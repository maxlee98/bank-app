// Home.jsx
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Redirect the user to the login page if there is no valid session
      navigate("/login");
    } else {
      fetch(
        `http://localhost:4000/api/get-account-information-user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAccount(data);
        })
        .catch((error) => {
          console.error(`Account Information Error: ${error}`);
        });

      const accountID = account.id;
      axios
        .get(`http://localhost:4000/api/get-account-transactions/${accountID}`)
        .then((response) => {
          setTransactions(response.data);
        });
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const debitAccount = account.id;
    const creditAccount = accountId;
    console.log(`Credit Account = ${creditAccount}`);
    if (debitAccount === accountId) {
      alert("Credit Account cannot be your account!");
      return;
    }

    console.log(
      `Debit Account: ${debitAccount}, Credit Account :${creditAccount}`
    );
    axios
      .get(
        `http://localhost:4000/api/get-account-information-account/${accountId}`
      )
      .then((response) => {
        console.log(response);
        const creditAccountData = response.data;
        if (creditAccountData) {
          const debitAmount = amount;
          console.log(
            `DebitAccount : ${debitAccount}, Debit Amount:${debitAmount}`
          );
          axios
            .put(
              `http://localhost:4000/api/update-account-debit/${debitAccount}`,
              {
                debitAmount,
              }
            )
            .then((res) => {
              if (res.status === 200) {
                console.log("Debit Account updated successfully");
                const creditAmount = amount;
                console.log(
                  `CreditAccount : ${creditAccount}, Credit Amount:${creditAmount}`
                );
                axios
                  .put(
                    `http://localhost:4000/api/update-account-credit/${creditAccount}`,
                    {
                      creditAmount,
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      console.log("Credit Account updated successfully");
                      axios
                        .post(
                          `http://localhost:4000/api/post-account-transaction`,
                          {
                            debit: debitAccount,
                            credit: creditAccount,
                            amount: amount,
                          }
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            console.log("Transaction created successfully");
                          }
                        })
                        .catch((error) => {
                          console.error(
                            `Transaction posting has encountered an error: ${error}`
                          );
                        });
                    }
                  })
                  .catch((error) => {
                    console.error(`Update credit account error: ${error}`);
                  });
              }
            })
            .catch((error) => {
              console.error(`Update debit account error: ${error}`);
            });
        }
      })
      .catch((error) => {
        console.error(`Search debit account error: ${error}`);
      });
  };

  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <h1>Bank Account Table</h1>
      <TableContainer component={Paper}>
        <Table aria-label="bank account table">
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell align="right">Account Type</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {100000 + account.id}
              </TableCell>
              <TableCell align="right">{account.bankAccountType}</TableCell>
              <TableCell align="right">${account.balance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Latest Transactions</h1>
      <TableContainer component={Paper}>
        <Table aria-label="transactions table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Transaction Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transaction_id}>
                <TableCell component="th" scope="row">
                  {transaction.time_stamp}
                </TableCell>
                <TableCell align="right">
                  {transaction.debit === account.id ? "Debit" : "Credit"}
                </TableCell>
                <TableCell align="right">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Transfer Money</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <TextField
          label="To Bank Account"
          placeholder="To Bank Account"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0 0 0 10px" }}>$</p>
          <TextField
            label="Amount"
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Button
            type="submit"
            style={{
              backgroundColor: "#09aeae",
              color: "white",
              marginLeft: "5px",
            }}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
