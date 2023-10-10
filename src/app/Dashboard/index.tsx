import React from "react";
import { Piechart } from "../components/PieChart";
import { useService } from "../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import { BarChart } from "../components/BarChart";
import "./style.scss"

export const Dashboard: React.FC = () => {
  const { orderService } = useService();

  const { data: orderList } = useQuery([EQueryKeys.GET_ORDER_LIST], () =>
    orderService.getOrderList()
  );
 
  return (
    <>
      <div className="bar-chart">
        <BarChart orderList={orderList?.data} />
      </div>
      <div className="pie-chart">
        <Piechart data={orderList?.data} />
      </div>
    </>
  );
};
