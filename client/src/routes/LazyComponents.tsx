import { lazy } from "react";

// Lazy-loaded components
export const Login = lazy(() => import("../pages/auth/login"));
export const AdminHome = lazy(() => import("../pages/admin/AdminDashboard"));
export const EmployeeDashboard = lazy(() => import("../pages/employee/EmployeeDashboard"));
export const Signup = lazy(() => import("../pages/auth/signUp"));
