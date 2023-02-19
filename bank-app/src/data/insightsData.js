export const monthlyExpenditureData = {
  series: [
    {
      name: "Expenditure",
      data: [32, 45, 28, 60, 42, 20],
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
};

export const lineChartData = {
  series: [
    {
      name: "Balance",
      data: [32, 45, 28, 60, 42, 20, 80, 30, 40, 50, 60, 70],
    },
  ],
  options: {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
