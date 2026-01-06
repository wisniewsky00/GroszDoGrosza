import { useState }
  from "react";
import { backendApi } from "../services/backendApi";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  async function login(email, password) {
    const response = await backendApi.post("/auth/login", {
      email,
      password
    });

    const { user, token } = response.data;

    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  async function register(username, email, password) {
    const response = await backendApi.post("/auth/register", {
      username,
      email,
      password
    })

    const { user, token } = response.data;
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
  }

  async function refreshUser() {
    const response = await backendApi.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}