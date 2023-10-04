import React from "react";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useService } from "../APIs/Services";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";
import { IBrand } from "../models";

interface IBrandContext {
  brandList: AxiosResponse<any, any> | undefined;
   mutateDeleteBrand: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, number, unknown>; 
   mutateEditBrand: UseMutateAsyncFunction<any,any,any>;
   mutateCreateBrand: UseMutateAsyncFunction<any,any,any>;
}

export const BrandContext = React.createContext<IBrandContext>(null as any);

export const BrandProvider: React.FC<any> = ({ children }: any) => {
  const { brandsService } = useService();
  const queryClient = useQueryClient();

  const { data: brandList } = useQuery([EQueryKeys.GET_BRAND_LIST], () =>
    brandsService.getBrandList()
  );

  const { mutateAsync: mutateCreateBrand } = useMutation(
    (body:Object) => brandsService.createBrand(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_BRAND_LIST]);
      },
    }
  );

  const { mutateAsync: mutateDeleteBrand } = useMutation(
    (id: number) => brandsService.deleteBrand(id),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_BRAND_LIST]);
      },
    }
  );

  const { mutateAsync: mutateEditBrand } = useMutation(
    (body: IBrand) => brandsService.editBrand(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_BRAND_LIST]);
      },
    }
  );
  return (
    <BrandContext.Provider
      value={{ brandList, mutateDeleteBrand, mutateEditBrand, mutateCreateBrand}}
    >
      {children}
    </BrandContext.Provider>
  );
};
