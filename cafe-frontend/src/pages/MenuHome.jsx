import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryCard from "../components/categoryCard";

function MenuHome() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      const images = [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93", // coffee
        "https://images.unsplash.com/photo-1551024506-0bccd828d307", // drinks
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // food
        "https://images.unsplash.com/photo-1551024601-bec78aea704b", // desserts
      ];
      const catsWithImages = res.data.map((cat, index) => ({
        ...cat,
        image: images[index % images.length],
      }));
      setCategories(catsWithImages);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Header />

      <h1 style={{ textAlign: "center" }}>Our Menu</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 20px" }}>
        <h2 style={{ marginLeft: "20px" }}>Categories</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px",
          padding: "20px",
          
        }}
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => navigate(`/menu/${cat.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuHome;
