/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext } from "react";
import { useQuery } from "react-query";

import { me } from "../../auth/api";
import {
  ProviderData,
  UserContextType,
  UserProviderProps,
} from "../../type/types";

const UserContext = createContext<UserContextType | undefined | ProviderData>(
  undefined
);

const UserProvider = ({ children }: UserProviderProps) => {
  const { data: response, isLoading } = useQuery(["getUsers"], me);

  return (
    <UserContext.Provider value={{ user: response?.data, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return React.useContext(UserContext);
};

export { useUser, UserProvider, UserContext };
