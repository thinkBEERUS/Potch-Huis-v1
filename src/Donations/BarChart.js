import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  const { data } = props;

  const chartData = {
    labels: [], // array to hold the labels (x-axis values)
    datasets: [
      {
        label: "Donations per Month",
        data: [], // array to hold the y-axis values
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // iterate over the data array and add the labels and values to the chartData object
  data.forEach((item) => {
    chartData.labels.push(
      `${new Date(item.year, item.month - 1).toLocaleString("default", {
        month: "short",
      })} ${item.year}`
    );

    chartData.datasets[0].data.push(item.donationCount);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Donations per Month: " + props.memberName,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
