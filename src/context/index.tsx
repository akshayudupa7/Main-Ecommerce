'use client'
import React, { createContext, useState , ReactNode } from "react";

// Set the initial context value to an object or the type you expect
interface GlobalStateContextProps {
  state: {
    // Define your state properties here
    // For example:
    counter: number;
    user: any; // Adjust the type as needed
  };
  setState: React.Dispatch<React.SetStateAction<GlobalStateContextProps["state"]>>;
}

export const GlobalContext = createContext<GlobalStateContextProps | null>(null);

interface GlobalStateProps {
    children: ReactNode;
  }

export default function GlobalState({ children }:GlobalStateProps ) {
  const initialState = {

    counter: 0,
    user: null,
  };

  const [state, setState] = useState(initialState);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
    
      {children}
    </GlobalContext.Provider>
  );
}
