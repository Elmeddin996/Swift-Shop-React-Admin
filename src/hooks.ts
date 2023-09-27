import React from "react";
import { AccountContext } from "./context/AccountContext";

export const useAuthentication =()=>React.useContext(AccountContext);
