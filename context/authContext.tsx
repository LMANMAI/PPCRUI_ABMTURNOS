import { createContext, useContext, useState, ReactNode } from "react";

export interface UserAD {
  username: string;
  name: string;
  groups: string[];
  legajo: string;
  account: Record<string, any>;
  suc: string[];
}

interface UserADContextType {
  userAD: UserAD;
  setUserAD: React.Dispatch<React.SetStateAction<UserAD>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultUserAD: UserAD = {
  username: "",
  name: "",
  groups: [],
  legajo: "",
  account: {},
  suc: [],
};

const UserADContext = createContext<UserADContextType | undefined>(undefined);

const UserADProvider = ({ children }: { children: ReactNode }) => {
  const [userAD, setUserAD] = useState<UserAD>(defaultUserAD);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  return (
    <UserADContext.Provider
      value={{ userAD, setUserAD, authenticated, setAuthenticated }}
    >
      {children}
    </UserADContext.Provider>
  );
};

export const useUserAD = (): UserADContextType => {
  const context = useContext(UserADContext);
  if (!context) {
    throw new Error("useUserAD debe usarse dentro de un UserADProvider");
  }
  return context;
};
export default UserADProvider;
