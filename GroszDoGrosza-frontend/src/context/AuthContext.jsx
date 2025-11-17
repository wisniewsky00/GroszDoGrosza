import { createContext, useState } 
from "react";
import { backendApi } from "../services/backendApi";

const AuthContext = createContext();

export function AuthProvider( {children} ) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  async function login(email, password) {
    const response = await backendApi.post("/auth/login", {
      email,
      password
    });

    const { user, token } = response.data;

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}