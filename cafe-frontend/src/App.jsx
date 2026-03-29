import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuHome from "./pages/MenuHome";
import CategoryPage from "./pages/CategoryPage";
import AddMenuItem from "./pages/AddMenuItem";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<MenuHome />} />
        <Route path="/menu/:categoryId" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-item" element={<AddMenuItem />} />
      </Routes>
    </Router>
  );
}

export default App;