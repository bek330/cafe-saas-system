import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await API.get("/menu");
      
      const filtered = res.data.find(
        (c) => c.category_id == categoryId
      );

      setItems(filtered ? filtered.items : []);
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div>
      <Header />

      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "15px",
        padding: "20px"
      }}>
        {items.map((item) => (
          <div key={item.id}>
            <img src={item.image_url} width="100%" />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;