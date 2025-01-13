import Navbar from "./components/Navbar";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ContactsPage from "./pages/ContactsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=> {
    checkAuth();
  }, []);

  if(isCheckingAuth && !authUser) return(
    // <span className="loading loading-ring loading-lg"></span>
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  )

  const location = useLocation();
  // page without navbar
  const noNavbarPages = [
    "/login", "/signup"
  ]

  const navigatePage = ({ element, requiresAuth }) => {
    return requiresAuth
      ? (authUser ? element : <Navigate to="/login" />)
      : (!authUser ? element : <Navigate to="/" />);
  };
  

  return (
    <>
      {!noNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
      <Route path="/" element={navigatePage({ element: <HomePage />, requiresAuth: true })} />
      <Route path="/signup" element={navigatePage({ element: <SignUpPage />, requiresAuth: false })} />
      <Route path="/login" element={navigatePage({ element: <LoginPage />, requiresAuth: false })} />
      <Route path="/profile" element={navigatePage({ element: <ProfilePage />, requiresAuth: true })} />
      <Route path="/contacts" element={navigatePage({ element: <ContactsPage />, requiresAuth: true })} />
      <Route path="/settings" element={navigatePage({ element: <SettingsPage />, requiresAuth: true })} />
      </Routes>

      <Toaster/>
    </>
  );
};

export default App;
