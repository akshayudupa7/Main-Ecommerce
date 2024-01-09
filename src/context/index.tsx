'use client';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import Cookies from "js-cookie";

export interface User {
  id: string;
  name: string;
  password: string;
  email:string;
  role: string;
}

export interface Current {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  priceDrop: number;
}

export interface CheckformData {
  shipping: any; // Adjust the type based on your actual data structure
  paymentMethod: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
}

export interface GlobalStateContextProps {
  authuser: boolean;
  setAuthUser: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  currentUpdated: Current | null;
  setCurrentUpdated: Dispatch<SetStateAction<Current | null>>;
  cartItem: any[]; // Include the cartItem property
  setCartItem: Dispatch<SetStateAction<any[]>>;
  checkform: CheckformData; // Include the checkform property
  setCheckform: Dispatch<SetStateAction<CheckformData>>;
}

export const GlobalContext = createContext<GlobalStateContextProps | null>(null);

interface GlobalStateProps {
  children: ReactNode;
}

export const initialCheckformData: CheckformData = {
  shipping: {},
  paymentMethod: '',
  totalPrice: '',
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

export default function GlobalState({ children }: GlobalStateProps) {
  const [authuser, setAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdated, setCurrentUpdated] = useState<Current | null>(null);
  const [cartItem, setCartItem] = useState<any[]>([]); // Adjust the type
  const [checkform, setCheckform] = useState<CheckformData>(initialCheckformData);

  useEffect(() => {
    console.log(Cookies.get('token'));
    if (Cookies.get('token') !== undefined) {
      setAuthUser(true);
      const userData: string | null = localStorage.getItem('user');
      setUser(userData !== null ? JSON.parse(userData) : null);
    } else {
      setAuthUser(false);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ authuser, setAuthUser, user, setUser, currentUpdated, setCurrentUpdated, cartItem, setCartItem, checkform, setCheckform }}>
      {children}
    </GlobalContext.Provider>
  );
}
