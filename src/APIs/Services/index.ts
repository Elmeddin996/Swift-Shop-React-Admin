import { AccountService } from "./Account";
import { BrandService } from "./Brands";
import { CategoryService } from "./Categories";
import { OrderService } from "./Orders";
import { ProductService } from "./Products";
import { StoreDataService } from "./StoreDatas";

export const useService=()=>{
    const services={
        productService: new ProductService(),
        accountService: new  AccountService(),
        orderService: new OrderService(),
        categoryService: new CategoryService(),
        brandsService: new BrandService(),
        storeDataService: new StoreDataService(),
    }

    return services;
}