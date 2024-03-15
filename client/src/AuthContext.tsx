import React, { createContext, useEffect, useState, ReactNode } from 'react';

import { User } from 'firebase/auth';

export const AUTH_USER_KEY = 'activeUser';
export const AUTH_STORAGE_EVENT = 'storage';

export interface AuthContextType {
  userValue: User | undefined | null;
  setUserValue: (user: User | undefined | null) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  userValue: undefined,
  setUserValue: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [userValue, setUserValue] = useState<User | undefined | null>(undefined); // Update the type accordingly

  const onUserValueSet = (user: User | undefined | null) => {
    if (!user) {
      localStorage.removeItem(AUTH_USER_KEY);
      window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
      setUserValue(null);
      return;
    }

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
    setUserValue(user);
  };

  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (storedUser) {
      setUserValue(JSON.parse(storedUser));
    } else {
      setUserValue(null);
    }
  };

  useEffect(() => {
    getUserFromStorage();

    window.addEventListener(AUTH_STORAGE_EVENT, () => {
      getUserFromStorage();
    });

    return () => {
      window.removeEventListener('AUTH_USER_KEY', () => {});
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userValue, setUserValue: onUserValueSet }}>
      {children}
    </AuthContext.Provider>
  );
};
