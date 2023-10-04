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
import { ICategory } from "../models";

interface ICategoryContext {
  categoryList: AxiosResponse<any, any> | undefined;
  mutateDeleteCategory: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    number,
    unknown
  >;
  mutateEditCategory: UseMutateAsyncFunction<any, any, any>;
  mutateCreateCategory: UseMutateAsyncFunction<any, any, any>;
}

export const CategoryContext = React.createContext<ICategoryContext>(
  null as any
);

export const CategoryProvider: React.FC<any> = ({ children }: any) => {
  const { categoryService } = useService();
  const queryClient = useQueryClient();

  const { data: categoryList } = useQuery([EQueryKeys.GET_CATEGORY_LIST], () =>
    categoryService.getCategoryList()
  );

  const { mutateAsync: mutateCreateCategory } = useMutation(
    (body: Object) => categoryService.createCategory(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CATEGORY_LIST]);
      },
    }
  );

  const { mutateAsync: mutateDeleteCategory } = useMutation(
    (id: number) => categoryService.deleteCategory(id),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CATEGORY_LIST]);
      },
    }
  );

  const { mutateAsync: mutateEditCategory } = useMutation(
    (body: ICategory) => categoryService.editCategory(body),
    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CATEGORY_LIST]);
      },
    }
  );
  return (
    <CategoryContext.Provider
      value={{
        categoryList,
        mutateDeleteCategory,
        mutateEditCategory,
        mutateCreateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
