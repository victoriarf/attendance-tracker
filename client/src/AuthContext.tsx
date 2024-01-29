import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { User } from 'firebase/auth';

export interface AuthContextType {
  userValue: User | undefined;
  setUserValue: Dispatch<SetStateAction<User | undefined>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  userValue: undefined,
  setUserValue: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [userValue, setUserValue] = useState<User | undefined>(undefined); // Update the type accordingly

  useEffect(() => {
    console.log('userValue', userValue);
  }, [userValue]);

  return (
    <AuthContext.Provider value={{ userValue, setUserValue }}>{children}</AuthContext.Provider>
  );
};
