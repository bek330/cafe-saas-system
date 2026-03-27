import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MenuHome() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Header />

      <h1 style={{ textAlign: "center" }}>Our Menu</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "15px",
        padding: "20px"
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/menu/${cat.id}`)}
            style={{
              padding: "20px",
              background: "#eee",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "10px"
            }}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuHome;