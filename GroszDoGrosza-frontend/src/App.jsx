import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { HomePage } from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/registration/RegisterPage";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/> 
          <Route path="/dashboard" element={<DashboardPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

