import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderLayout from "./layouts/OrderLayout";
import Home from "./pages/Home";
import Category from "./pages/category";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import Kitchen from "./pages/Kitchen";
import Login from "./pages/Login";
import ProtectedRoute from "./contexts/AuthContext";

// 🔐 protect admin


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OrderLayout />}>
          <Route path="/menu" element={<Home />} />
          <Route path="/menu/category/:id" element={<Category />} />
          <Route path="/success/:id" element={<OrderSuccess />} />
        </Route>

        {/* 🔐 protected admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* decide if kitchen needs auth */}
        <Route path="/kitchen" element={<Kitchen />} />

        <Route path="/login" element={<Login />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/menu" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;