import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  const [bankAccount, setBankAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Bank Account: ", bankAccount);
    console.log("Amount: ", amount);
  };

  return (
    <div>
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
                1234567890
              </TableCell>
              <TableCell align="right">Checking</TableCell>
              <TableCell align="right">$1,000</TableCell>
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
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
