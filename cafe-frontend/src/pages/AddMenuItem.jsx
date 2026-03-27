import { useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AddMenuItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
  });

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
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <h1>Add Menu Item</h1>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <br />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <br />
          <input name="price" placeholder="Price" onChange={handleChange} />
          <br />
          <input
            name="category_id"
            placeholder="Category ID"
            onChange={handleChange}
          />
          <br />
          <input
            name="image_url"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <br />

          <button type="submit">Add Item</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddMenuItem;
