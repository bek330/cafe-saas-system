import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderLayout from "./layouts/OrderLayout";
import Menu from "./pages/Menu";
import Category from "./pages/category";
import OrderSuccess from "./pages/OrderSuccess";
import AdminOrders from "./pages/AdminOrders";
import Kitchen from "./pages/Kitchen";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import AdminMenu from "./pages/AdminMenu";
import AdminLayout from "./layouts/AdminLayout";
import AdminCategories from "./pages/AdminCategories";
import AdminUsers from "./pages/AdminUsers";
import AdminHistory from "./pages/AdminHistory";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<OrderLayout />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/category/:id" element={<Category />} />
            <Route path="/success/:id" element={<OrderSuccess />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="history" element={<AdminHistory />} />
          </Route>

          <Route
            path="/kitchen"
            element={
              <ProtectedRoute role="admin">
                <Kitchen />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
