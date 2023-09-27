import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./consts";
import { ProtectedRouterLogin } from "../ProtectedRouters/ProtectedLogin";
import SidebarWithHeader from "../app/components/SideBar";
import { Dashboard } from "../app/Dashboard";
import { Products } from "../app/Products";
import { Categories } from "../app/Categories";
import { Brands } from "../app/Brands";
import { Users } from "../app/Users";
import { Orders } from "../app/Orders";
import { StoreDatas } from "../app/StoreDatas";
import { AccountProvider } from "../context/AccountContext";
import { Login } from "../app/Login";

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRouterLogin>
            <AccountProvider>
              <Login />
            </AccountProvider>
          </ProtectedRouterLogin>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <SidebarWithHeader>
            <Dashboard />
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.PRODUCT.LIST}
        element={
          <SidebarWithHeader>
            <Products />
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.CATEGORY.LIST}
        element={
          <SidebarWithHeader>
            <Categories />
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.BRAND.LIST}
        element={
          <SidebarWithHeader>
            <Brands />
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.USER.LIST}
        element={
          <SidebarWithHeader>
            <AccountProvider>
              <Users />
            </AccountProvider>
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.ORDER.LIST}
        element={
          <SidebarWithHeader>
            <Orders />
          </SidebarWithHeader>
        }
      />
      <Route
        path={ROUTES.STORE_DATA.LIST}
        element={
          <SidebarWithHeader>
            <StoreDatas />
          </SidebarWithHeader>
        }
      />
    </Routes>
  );
};
