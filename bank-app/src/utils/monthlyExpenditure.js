export default function updateMonthlyExpenditure(newData) {
  const amountData = newData.map((obj) => obj.total_amount);
  const monthData = newData.map((obj) => obj.month);

  const monthlyExpenditureData = {
    series: [
      {
        name: "Expenditure",
        data: amountData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 100,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        date: monthData,
      },
    },
  };

  return monthlyExpenditureData;
}
