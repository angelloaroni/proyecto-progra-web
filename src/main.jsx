import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import AdminClaimsPage from "./pages/AdminClaimsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminItemsPage from "./pages/AdminItemsPage.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/student", element: <StudentPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/register", element: <AdminRegisterPage /> },
      { path: "/admin/claims", element: <AdminClaimsPage /> },
      { path: "/admin/users", element: <AdminUsersPage /> },
      { path: "/admin/items", element: <AdminItemsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
