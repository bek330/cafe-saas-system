import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminAddItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/categories");
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/menu", {
        ...form,
        price: Number(form.price),
        category_id: Number(form.category_id),
      });

      alert("Item added!");

      setForm({
        name: "",
        description: "",
        price: "",
        category_id: "",
        image_url: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <AdminLayout>
      <h1>Add Menu Item</h1>

      <form onSubmit={handleSubmit} >
        
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br /><br />

        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />

        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br /><br />

        <select name="category_id" value={form.category_id} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select><br /><br />

        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} /><br /><br />

        <button type="submit">Add Item</button>
      </form>
    </AdminLayout>
  );
}

export default AdminAddItem;