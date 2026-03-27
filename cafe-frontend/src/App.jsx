import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuHome from "./pages/MenuHome";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/menu" element={<MenuHome />} />
        <Route path="/menu/:categoryId" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;