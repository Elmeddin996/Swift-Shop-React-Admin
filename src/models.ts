export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  isAdmin: boolean;
  emailConfirm: boolean;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IOrder {
  id: number;
  fullName: string;
  createdAt: string;
  status: number;
  phone: string;
  address: string;
  email: string;
  note: string;
  orderItems: [
    {
      count: number;
      productId: number;
      productName: string;
    }
  ];
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  salePrice: number;
  costPrice?: number;
  discountPercent: number;
  rate?: number;
  stock?: number;
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  imageUrl: string;
  imageUrls?: [string];
}

export interface ICreateProduct {
  posterImageFile: FileList;
  imageFiles: FileList;
  name: string | undefined;
    description: string | undefined;
    salePrice: number | undefined;
    costPrice: number | undefined;
  discountPercent: number| undefined;
  rate: number| undefined;
  stock: number| undefined;
  brandId: number| undefined;
  categoryId: number| undefined;
}
