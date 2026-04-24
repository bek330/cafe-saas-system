import { useEffect, useState } from "react";

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: "",
  });

  const token = localStorage.getItem("token");

  // 🔄 FETCH MENU
  const fetchMenu = async () => {
    const res = await fetch("http://localhost:5000/menu");
    const data = await res.json();
    setItems(data);
  };

  // 🔄 FETCH CATEGORIES
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMenu();
    fetchCategories();
  }, []);

  // ➕ CREATE or ✏️ UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category_id) {
      alert("All fields required");
      return;
    }

    const url = editingId
      ? `http://localhost:5000/menu/${editingId}`
      : "http://localhost:5000/menu";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        category_id: Number(form.category_id),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed");
      return;
    }

    resetForm();
    fetchMenu();
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      image_url: "",
      category_id: "",
    });
    setEditingId(null);
  };

  // ✏️ EDIT START
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url,
      category_id: item.category_id,
    });
    setEditingId(item.id);
  };

  // 🔄 TOGGLE AVAILABILITY
  const toggleItem = async (id) => {
    await fetch(`http://localhost:5000/menu/toggle/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });

    fetchMenu();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      {/* FORM */}
      <div className="mb-6 space-x-2 flex flex-wrap gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded "
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2 rounded"
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-500 hover:text-black transition-ease-in-out duration-200  "
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button onClick={resetForm} className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white transition">
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between border p-2">
            <div>
              {item.name} - ${item.price}{" "}
              {!item.is_available && "(Unavailable)"}
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => toggleItem(item.id)}
                className="bg-yellow-500 text-white px-2 rounded hover:bg-yellow-600 transition"
              >
                {item.is_available ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMenu;
