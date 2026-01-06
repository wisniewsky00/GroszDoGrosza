import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { HomePage } from "./pages/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { ArticlesPage } from "./pages/articles/ArticlesPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthenticatedLayout } from "./layouts/AuthenticatedLayout";
import { ArticlePage } from "./pages/articles/ArticlePage";
import ScrollToTop from "./components/ScrollToTop";
import { VerifyEmailPage } from "./pages/register/VerifyEmailPage";
import { EditProfile } from "./pages/profile/EditProfile";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        
        <Routes>

          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/verify-email" element={<VerifyEmailPage />} />
          </Route>


          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/articles" element={<ArticlesPage />} >
              <Route path=":slug" element={<ArticlePage />}/>
            </Route>
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

