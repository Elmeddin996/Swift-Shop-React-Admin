import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface IPieData {
  data: any;
}

export const Piechart: React.FC<IPieData> = ({ data }) => {
  const [chartData, setChartData] = React.useState<any>();

  React.useEffect(() => {
    const statusMapping: { [key: string]: string } = {
        "1": "Pending",
        "2": "Accepted",
        "3": "Rejected",
      };
    
      const statusCounts: { [key: string]: number } = {
        "Pending": 0,
        "Accepted": 0,
        "Rejected": 0,
      };
    
      data?.forEach((order: any) => {
        const status = order.status;
        const statusName = statusMapping[status];
        if (statusCounts.hasOwnProperty(statusName)) {
          statusCounts[statusName]++;
        }
      });
    
      const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
          {
            data: Object.values(statusCounts),
            backgroundColor: [
              'rgba(255, 166, 0, 0.699)',
              'rgba(0, 128, 0, 0.699)',   
              'rgba(255, 0, 0, 0.699)',   
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      setChartData(chartData);
  }, [data]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 mb-3 mt-3 ">
          {chartData?  <Pie
          width={200}
          height={300}
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    text: "Orders Information",
                    display: true,
                    font: { size: 20 },
                  },
                  legend: {
                    labels: {
                      font: { size: 15 },
                    },
                  },
                },
              }}
            />:""}
          </div>
        </div>
      </div>
    </>
  );
};
