"use client";
import { User } from "@prisma/client";
import { createContext, useContext } from "react";

export interface AppContextType {
  user: User | null;
}

export const AppContext = createContext<AppContextType>({ user: null });

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({
  value,
  children,
}: {
  value: AppContextType;
  children: React.ReactNode;
}) => <AppContext.Provider value={value}>{children}</AppContext.Provider>;
