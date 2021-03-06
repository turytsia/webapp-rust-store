import { createContext, useState, useEffect } from "react";
import cookie from "js-cookie";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onLogin = (token = "") => {
    console.log(token);
    if (cookie.get("token")) {
      setIsLoggedIn(true);
    }
    if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    }
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    cookie.remove("token");
  };

  useEffect(() => {
    if (cookie.get("token")) {
      onLogin();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: onLogin, logout: onLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
