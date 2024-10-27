import { ReactNode } from "react";

export type UserProviderProps = {
  children: ReactNode;
};
export type UserContextType = {
  user: string | null;
};

export type ProviderData = {
  user: Record<string, string>;
  isLoading: boolean;
  refetchUser: CallableFunction;
};

export type SetUserDetailsType = React.Dispatch<
  React.SetStateAction<UserContextType>
>;
