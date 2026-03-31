/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name) return;

    try {
      await API.post("/categories", { name });
      setName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      await API.put(`/menu/disable/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1>Categories</h1>

      <div>
        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          
        >
          <span>{cat.name}</span>
          <button onClick={() => deleteCategory(cat.id)}>Delete</button>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminCategories;