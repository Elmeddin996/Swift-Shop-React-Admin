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
