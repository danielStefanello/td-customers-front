import { createContext, useState, ReactNode, useContext } from 'react';

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userName: '',
  setUserName: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
