import React from "react";
import { AccountContext } from "./context/AccountContext";
import { BrandContext } from "./context/BrandContext";
import { CategoryContext } from "./context/CategoryContext";
import { ProductContext } from "./context/ProductContext";
import { OrderContext } from "./context/OrderContext";
import { SliderContext } from "./context/SliderContext";

export const useAuthentication =()=>React.useContext(AccountContext);
export const useBrandContext =()=>React.useContext(BrandContext);
export const useCategoryContext =()=>React.useContext(CategoryContext);
export const useProductContext =()=>React.useContext(ProductContext);
export const useOrderContext =()=>React.useContext(OrderContext);
export const useSliderContext =()=>React.useContext(SliderContext);
