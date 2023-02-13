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
  const [accountID, setAccountID] = useState("");
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

    console.log(
      `Making a PUT request to http://localhost:4000/api/update-account/${accountID}`
    );
    console.log(`Amount: ${amount}`);

    // axios
    //   .put(`http://localhost:4000/api/update-account/${accountID}`, {
    //     amount,
    //   })
    // .then((res) => {
    //   console.log(`Response from server: ${res}`);
    //   if (res.status === 200) {
    //     console.log("Account updated successfully");
    //   }
    // })
    // .catch((error) => {
    //   console.error(`Update account error: ${error}`);
    // });

    fetch(`http://localhost:4000/api/update-account/${accountID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => {
        console.log(`Response from server: ${res}`);
        if (res.status === 200) {
          console.log("Account updated successfully");
        }
      })
      .catch((error) => {
        console.error(`Update account error: ${error}`);
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
                {100000 + account.account}
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
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <TextField
          label="To Bank Account"
          placeholder="To Bank Account"
          value={accountID}
          onChange={(event) => setAccountID(event.target.value)}
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
