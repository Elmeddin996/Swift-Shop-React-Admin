import React from "react";
import { AccountContext } from "./context/AccountContext";
import { BrandContext } from "./context/BrandContext";

export const useAuthentication =()=>React.useContext(AccountContext);
export const useBrandContext =()=>React.useContext(BrandContext);
