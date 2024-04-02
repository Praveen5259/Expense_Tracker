import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {getDataForLastDay} from './utils';
import 'chartjs-adapter-date-fns';
const DoughnutChart = ({ options, totalExpense }) => {
  const dataForLastDay = getDataForLastDay(totalExpense);
  const chartData = {
    labels: dataForLastDay?.map((data) => data.category) || [],
    datasets: [
      {
        label: "Previous day expense",
        data: dataForLastDay?.map((data) => data.expense) || [],
        backgroundColor: [
          "#9BBFE0",
          "#00a9b5",
          "#ff6361",
          "#619B8A",
          "#FBE29F",
          "#E8A09A"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };

  console.log("Chart data:", chartData);

  return (
    <Doughnut
      style={{ margin: "0 auto" }}
      data={chartData}
      options={options}
    />
  );
};
export default DoughnutChart