import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/layouts/HomeLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";

const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);

export default router;
