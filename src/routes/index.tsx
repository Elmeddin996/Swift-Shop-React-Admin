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
import { BrandProvider } from "../context/BrandContext";
import { CategoryProvider } from "../context/CategoryContext";
import { ProductProvider } from "../context/ProductContext";
import { ProductCreate } from "../app/ProductCreate";
import { OrderProvider } from "../context/OrderContext";
import { ProductEdit } from "../app/ProductEdit";
import { Sliders } from "../app/Sliders";
import { SliderProvider } from "../context/SliderContext";
import { SliderCreateEdit } from "../app/SliderCreateEdit";
import { ProtectedRouter } from "../ProtectedRouters/ProtectedRouter";

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
          <ProtectedRouter>
            <SidebarWithHeader>
              <Dashboard />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.PRODUCT.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <ProductProvider>
                <Products />
              </ProductProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

      <Route
        path={ROUTES.PRODUCT.CREATE}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <ProductProvider>
                <ProductCreate />
              </ProductProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={`${ROUTES.PRODUCT.EDIT}/:id`}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <ProductProvider>
                <ProductEdit />
              </ProductProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.CATEGORY.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <CategoryProvider>
                <Categories />
              </CategoryProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.BRAND.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <BrandProvider>
                <Brands />
              </BrandProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.USER.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <AccountProvider>
                <Users />
              </AccountProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.ORDER.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <OrderProvider>
                <Orders />
              </OrderProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

      <Route
        path={ROUTES.SLIDER.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <SliderProvider>
                <Sliders />
              </SliderProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

      <Route
        path={ROUTES.SLIDER.CREATE}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <SliderProvider>
                <SliderCreateEdit />
              </SliderProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

      <Route
        path={`${ROUTES.SLIDER.EDIT}/:id`}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <SliderProvider>
                <SliderCreateEdit />
              </SliderProvider>
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

      <Route
        path={ROUTES.STORE_DATA.LIST}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <StoreDatas />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />

<Route
        path="*"
                element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Dashboard />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
    </Routes>
  );
};
