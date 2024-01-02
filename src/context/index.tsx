"use client";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  password: string;
  role: string;
}

interface Current {
  _id:string;
  name: string;
  price: number;
  description: string;
  category: string;
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  priceDrop: number;

}
interface GlobalStateContextProps {
  authuser: boolean;
  setAuthUser: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  currentUpdated:Current | null; 
  setCurrentUpdated: Dispatch<SetStateAction<Current | null>>;
}

export const GlobalContext = createContext<GlobalStateContextProps | null>(null);

interface GlobalStateProps {
  children: ReactNode;
}

export default function GlobalState({ children }: GlobalStateProps) {
  const [authuser, setAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdated, setCurrentUpdated] = useState<Current | null>(null);

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
    <GlobalContext.Provider value={{ authuser, setAuthUser, user, setUser, currentUpdated, setCurrentUpdated }}>
      {children}
    </GlobalContext.Provider>
  );
}
