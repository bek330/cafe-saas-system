import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuHome from "./pages/MenuHome";
import CategoryPage from "./pages/CategoryPage";
import AdminAddItem from "./pages/AdminAddItem";
import AdminMenuList from "./pages/AdminMenuList";
import AdminOrders from "./pages/AdminOrders";
import AdminCategories from "./pages/AdminCategories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<MenuHome />} />
        <Route path="/menu/:categoryId" element={<CategoryPage />} />
        <Route path="/admin/menu-list" element={<AdminMenuList />} />
        <Route path="/admin/new-menu" element={<AdminAddItem />} />
        <Route path="/admin" element={<AdminOrders />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
      </Routes>
    </Router>
  );
}

export default App;