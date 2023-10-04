import React from "react";
import { useService } from "../APIs/Services";
import { UseMutateAsyncFunction, useMutation, useQuery, useQueryClient } from "react-query";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";

interface IOrderContext {
  orderList: AxiosResponse<any, any> | undefined;
  mutateEditOrder: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, Object, unknown>;
}

export const OrderContext = React.createContext<IOrderContext>(null as any);

export const OrderProvider: React.FC<any> = ({ children }: any) => {
  const { orderService } = useService();
  const queryClient = useQueryClient();

  const { data: orderList } = useQuery([EQueryKeys.GET_ORDER_LIST], () =>
    orderService.getOrderList()
  );

  const { mutateAsync: mutateEditOrder } = useMutation(
    [EQueryKeys.GET_ORDER_LIST],
    (order: Object) => orderService.editOrder(order),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_ORDER_LIST]);
      },
    }
  );

  return (
    <OrderContext.Provider value={{ orderList,mutateEditOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
