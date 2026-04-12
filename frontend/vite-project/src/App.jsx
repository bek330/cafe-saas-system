import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderLayout from "./layouts/OrderLayout";
import Home from "./pages/Home";
import Category from "./pages/category";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<OrderLayout />}>
          <Route path="/menu" element={<Home />} />
          <Route path="/menu/category/:id" element={<Category />} />
          <Route path="success/:id" element={<OrderSuccess />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;