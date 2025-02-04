import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ContactsPage from "./pages/ContactsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemesStore } from "./store/useThemesStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemesStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser)
    return (
      // <span className="loading loading-ring loading-lg"></span>
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    );

  const navigatePage = ({ element, requiresAuth }) => {
    return requiresAuth ? (
      authUser ? (
        element
      ) : (
        <Navigate to="/login" />
      )
    ) : !authUser ? (
      element
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <div data-theme={theme} className="transition-all duration-700">
      <Routes>
        <Route
          path="/signup"
          element={navigatePage({
            element: <SignUpPage />,
            requiresAuth: false,
          })}
        />
        <Route
          path="/login"
          element={navigatePage({
            element: <LoginPage />,
            requiresAuth: false,
          })}
        />
        <Route
          path="/"
          element={navigatePage({ element: <HomePage />, requiresAuth: true })}
        />
        <Route
          path="/profile"
          element={navigatePage({
            element: <ProfilePage />,
            requiresAuth: true,
          })}
        />
        <Route
          path="/contacts"
          element={navigatePage({
            element: <ContactsPage />,
            requiresAuth: true,
          })}
        />
        <Route
          path="/settings"
          element={navigatePage({
            element: <SettingsPage />,
            requiresAuth: true,
          })}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
