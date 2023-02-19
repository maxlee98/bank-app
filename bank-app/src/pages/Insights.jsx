import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { monthlyExpenditureData, lineChartData } from "../data/insightsData";
import axios from "axios";
import { Button } from "@mui/material";
import updateMonthlyExpenditure from "../utils/monthlyExpenditure";

export default function Insights() {
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(
    monthlyExpenditureData
  );

  useEffect(() => {
    const accountID = localStorage.getItem("accountID");
    axios
      .get(`http://localhost:4000/api/monthly-transaction-summary/${accountID}`)
      .then((response) => {
        setMonthlyExpenditure(updateMonthlyExpenditure(response.data));
      });
  }, []);

  const handleRefreshButton = (event) => {
    event.preventDefault();
    console.log("Refresh Button Clicked!");
    console.log(monthlyExpenditure);
    const accountID = localStorage.getItem("accountID");
    axios
      .get(`http://localhost:4000/api/monthly-transaction-summary/${accountID}`)
      .then((response) => {
        setMonthlyExpenditure(updateMonthlyExpenditure(response.data));
      });
    console.log(monthlyExpenditure);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h2>Monthly Expenditure</h2>
        <Button
          style={{
            backgroundColor: "#09aeae",
            color: "white",
            marginLeft: "5px",
          }}
          onClick={handleRefreshButton}
        >
          Refresh
        </Button>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Chart
          options={monthlyExpenditure.options}
          series={monthlyExpenditure.series}
          type="bar"
          width={1000}
          height={500}
        />
      </div>

      <h2>Account Balance Over Time</h2>
      <Chart
        options={lineChartData.options}
        series={lineChartData.series}
        type="line"
      />
    </div>
  );
}
