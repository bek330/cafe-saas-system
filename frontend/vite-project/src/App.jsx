import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderLayout from "./layouts/OrderLayout";
import Home from "./pages/Home";
import Category from "./pages/category";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import Kitchen from "./pages/Kitchen";

import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OrderLayout />}>
          <Route path="/menu" element={<Home />} />
          <Route path="/menu/category/:id" element={<Category />} />
          <Route path="success/:id" element={<OrderSuccess />} />
        </Route>
        <Route
          path="/admin"
          element={<Admin/>}
        />
        <Route path="/login" element={<Login />} />
        
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
