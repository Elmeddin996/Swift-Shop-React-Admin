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

interface ISliderContext {
  sliderList: AxiosResponse<any, any> | undefined;
  mutateCreateSlider: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    unknown,
    FormData,
    unknown
  >;
  mutateEditSlider: UseMutateAsyncFunction<any, any, any>;
  mutateDeleteSlider: UseMutateAsyncFunction<any, any, any>;
}

export const SliderContext = React.createContext<ISliderContext>(null as any);

export const SliderProvider: React.FC<any> = ({ children }: any) => {
  const { sliderService } = useService();
  const queryClient = useQueryClient();

  const { data: sliderList } = useQuery([EQueryKeys.GET_SLIDER_LIST], () =>
    sliderService.getSliders()
  );

  const { mutateAsync: mutateCreateSlider } = useMutation(
    (body: FormData) => sliderService.createSlider(body),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([EQueryKeys.GET_SLIDER_LIST]),
    }
  );

  const { mutateAsync: mutateEditSlider } = useMutation(
    (body: FormData) => sliderService.editSlider(body),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([EQueryKeys.GET_SLIDER_LIST]),
    }
  );

  const { mutateAsync: mutateDeleteSlider } = useMutation(
    (id:number) => sliderService.deleteSlider(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([EQueryKeys.GET_SLIDER_LIST]),
    }
  );

  return (
    <SliderContext.Provider
      value={{ sliderList, mutateCreateSlider, mutateEditSlider,mutateDeleteSlider }}
    >
      {children}
    </SliderContext.Provider>
  );
};
