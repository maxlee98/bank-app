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

export default function Home() {
  const navigate = useNavigate();
  const [bankAccount, setBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState({});
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Redirect the user to the login page if there is no valid session
      navigate("/login");
    } else {
      fetch(`http://localhost:4000/api/get-account-information/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAccount(data);
        })
        .catch((error) => {
          console.error(`Account Information Error: ${error}`);
        });
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Account : ${account}`);
    console.log("Bank Account: ", bankAccount);
    console.log("Amount: ", amount);
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
                {100000 + account.account}
              </TableCell>
              <TableCell align="right">{account.bankAccountType}</TableCell>
              <TableCell align="right">{account.balance}</TableCell>
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
            <TableRow>
              <TableCell component="th" scope="row">
                01/01/2023
              </TableCell>
              <TableCell align="right">Deposit</TableCell>
              <TableCell align="right">$100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Transfer Money</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Bank Account"
          placeholder="Bank Account"
          value={bankAccount}
          onChange={(event) => setBankAccount(event.target.value)}
        />
        <TextField
          label="Amount"
          placeholder="Amount"
          value={0}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
