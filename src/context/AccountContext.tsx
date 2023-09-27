import React from "react";
import { UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { ILogin } from "../models";
import { useService } from "../APIs/Services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/consts";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";

interface IAuthContext {
  mutateLogin: UseMutateAsyncFunction<void, unknown, ILogin, unknown>;
  result: string;
  userList: AxiosResponse<any, any> | undefined;
}

export const AccountContext = React.createContext<IAuthContext>(null as any);

export const AccountProvider: React.FC<any> = ({ children }: any) => {
  const { accountService } = useService();
  const navigate = useNavigate();
  const [result, setResult] = React.useState<string>("");

  const { mutateAsync: mutateLogin } = useMutation(
    (RequestBody: ILogin) => accountService.login(RequestBody),
    {
      onError: () => setResult(`error`),
      onSuccess: () => {
        navigate(ROUTES.DASHBOARD);
      },
    }
  );

  const { data: userList } = useQuery([EQueryKeys.GET_USER_LIST], () => accountService.users());

  return (
    <AccountContext.Provider value={{ mutateLogin, result, userList }}>
      {children}
    </AccountContext.Provider>
  );
};
