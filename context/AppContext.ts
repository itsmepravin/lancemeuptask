import { createContext, Dispatch, SetStateAction } from "react";
import { ObjectId } from "mongodb";

export interface TypeCurrentUser {
  country: string;
  email: string;
  name: string;
  password: string;
  role: string;
  _id: ObjectId;
}

export type LoginRegisterResData = {
  success: boolean;
  user: TypeCurrentUser;
};

export type SingleCountry = {
  name: string;
  independent: boolean;
};

export type ProductItem = {
  title: string;
  category: string;
  description: string;
  id: number;
  _id: ObjectId;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
};

export interface ProductItemProps {
  products: ProductItem[];
}

export interface TypeCurrentUserCartItem extends ProductItem {
  quantity: number;
}

export type TAddProduct = {
  success: boolean;
  message: string;
};

export type TDelProduct = {
  success: boolean;
  message: string;
};

interface AppContextInterface {
  registerInfo: {
    registerName: string;
    setRegisterName: Dispatch<SetStateAction<string>>;
    registerCountry: string;
    setRegisterCountry: Dispatch<SetStateAction<string>>;
    registerEmail: string;
    setRegisterEmail: Dispatch<SetStateAction<string>>;
    registerPassword: string;
    setRegisterPassword: Dispatch<SetStateAction<string>>;
    registerPasswordCon: string;
    setRegisterPasswordCon: Dispatch<SetStateAction<string>>;
  };
  loginInfo: {
    loginEmail: string;
    setLoginEmail: Dispatch<SetStateAction<string>>;
    loginPassword: string;
    setLoginPassword: Dispatch<SetStateAction<string>>;
  };
  errorInfo: {
    registerNameErrMsg: string;
    setRegisterNameErrMsg: Dispatch<SetStateAction<string>>;
    loginEmailErrMsg: string;
    setLoginEmailErrMsg: Dispatch<SetStateAction<string>>;
    loginPasswordErrMsg: string;
    setLoginPasswordErrMsg: Dispatch<SetStateAction<string>>;
    registerEmailErrMsg: string;
    setRegisterEmailErrMsg: Dispatch<SetStateAction<string>>;
    registerPasswordErrMsg: string;
    setRegisterPasswordErrMsg: Dispatch<SetStateAction<string>>;
    registerPasswordConErrMsg: string;
    setRegisterPasswordConErrMsg: Dispatch<SetStateAction<string>>;
  };
  currentUserInfo: {
    currentUser: TypeCurrentUser;
    setCurrentUser: Dispatch<SetStateAction<TypeCurrentUser | null>>;
    currentUserCart: TypeCurrentUserCartItem[];
    setCurrentUserCart: Dispatch<SetStateAction<TypeCurrentUserCartItem[]>>;
  };
}

const AppContext = createContext<AppContextInterface>(null!);

export default AppContext;
