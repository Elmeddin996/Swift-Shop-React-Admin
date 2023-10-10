import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { IOrder } from "../../../models";
ChartJS.register();

interface IBarChart {
  orderList:IOrder[]
}
export const BarChart: React.FC<IBarChart> = ({ orderList }) => {

  const monthlyOrders = new Array(12).fill(0);

  orderList?.forEach((order: IOrder) => {
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    monthlyOrders[month]++;
  });
  
  const orderData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Order Count",
        data: monthlyOrders,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  

  return <Bar data={orderData} options={{
    responsive: true,
    plugins: {
      title: {
        text: "Statistics Of Orders by Month",
        display: true,
        font: { size: 20 },
      },
      legend: {
        labels: {
          font: { size: 15 },
        },
      },
    },
  }} />;
};
