import React from 'react'
import { Piechart } from '../components/PieChart'
import { useService } from '../../APIs/Services';
import { useQuery } from 'react-query';
import { EQueryKeys } from '../../enums';

export const Dashboard:React.FC = () => {
  const { orderService } = useService();

  const { data: orderList } = useQuery([EQueryKeys.GET_ORDER_LIST], () =>
    orderService.getOrderList()
  );
  console.log(orderList);

  return (
    <div style={{width:"500px"}}>
      <Piechart data={orderList?.data}/>
    </div>
  )
}
