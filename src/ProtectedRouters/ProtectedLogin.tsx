import React from "react";
import { ROUTES } from "../routes/consts";
import { Navigate } from "react-router-dom";

interface IProps {
  children: any;
}

export const ProtectedRouterLogin: React.FC<IProps> = ({ children }) => {
 
  if (!localStorage.getItem("adminToken")) {
    return <>{children}</>;
  }
  return <Navigate to={ROUTES.DASHBOARD} />;
};
