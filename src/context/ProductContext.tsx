import React from "react";
import { useService } from "../APIs/Services";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";

interface IProductContext {
  productList: AxiosResponse<any, any> | undefined;
  mutateCreateProduct: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    FormData,
    unknown
  >;
  mutateEditProduct: UseMutateAsyncFunction<any, any, any>;
  mutateDeleteProduct: UseMutateAsyncFunction<any, any, any>;
}

export const ProductContext = React.createContext<IProductContext>(null as any);

export const ProductProvider: React.FC<any> = ({ children }: any) => {
  const { productService } = useService();
  const queryClient = useQueryClient();

  const { data: productList } = useQuery([EQueryKeys.GET_PRODUCT_LIST], () =>
    productService.getProductList()
  );

  const { mutateAsync: mutateCreateProduct } = useMutation(
    (body: FormData) => productService.createProduct(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_PRODUCT_LIST]);
      },
    }
  );
  const { mutateAsync: mutateEditProduct } = useMutation(
    (body: FormData) => productService.editProduct(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_PRODUCT_LIST]);
      },
    }
  );

  const { mutateAsync: mutateDeleteProduct } = useMutation(
    (id: number) => productService.deleteProduct(id),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_PRODUCT_LIST]);
      },
    }
  );

  return (
    <ProductContext.Provider
      value={{ productList, mutateCreateProduct, mutateEditProduct, mutateDeleteProduct}}
    >
      {children}
    </ProductContext.Provider>
  );
};
