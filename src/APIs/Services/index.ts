import { AccountService } from "./Account";
import { BrandService } from "./Brands";
import { CategoryService } from "./Categories";
import { OrderService } from "./Orders";
import { ProductService } from "./Products";
import { SliderService } from "./Sliders";
import { StoreDataService } from "./StoreDatas";

export const useService=()=>{
    const services={
        productService: new ProductService(),
        accountService: new  AccountService(),
        orderService: new OrderService(),
        sliderService: new SliderService(),
        categoryService: new CategoryService(),
        brandsService: new BrandService(),
        storeDataService: new StoreDataService(),
    }

    return services;
}