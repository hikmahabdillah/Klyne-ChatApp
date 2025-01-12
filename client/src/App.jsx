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
  }, [checkAuth]);

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

  return (
    <>
      {!noNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/contacts" element={authUser ? <ContactsPage /> : <Navigate to="/login"/>} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster/>
    </>
  );
};

export default App;
