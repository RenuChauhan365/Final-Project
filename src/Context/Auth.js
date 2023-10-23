import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: '' };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);


  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

   const isAuthenticated = () => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      return !!parseData.token; // Returns true if token exists, else false
    }
    return false;
  };


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export { AuthProvider ,isAuthenticated };
