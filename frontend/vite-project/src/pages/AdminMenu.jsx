import { useEffect, useState } from "react";

function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: "",
    is_available: true,
  });
  const [categories, setCategories] = useState([]);

  const fetchMenu = async () => {
  const res = await fetch("http://localhost:5000/menu", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  const data = await res.json();
  setItems(data);
};

  useEffect(() => {
     
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMenu();
  }, []);

  const handleSubmit = async () => {
  if (!form.name || !form.price || !form.category_id) {
    alert("All fields are required");
    return;
  }

  const res = await fetch("http://localhost:5000/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      ...form,
      price: Number(form.price),
      category_id: Number(form.category_id),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.error || "Failed to create item");
    return;
  }

  setForm({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: "",
  });

  fetchMenu();
};
  const toggleItem = async (id) => {
    await fetch(`http://localhost:5000/menu/toggle/${id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    fetchMenu();
  };
  
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


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>

      {/* ADD FORM */}
      <div className="mb-6 space-x-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Description"
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2"
        />

        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2"
        >
          Add
        </button>
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
                onClick={() => toggleItem(item.id)}
                className="bg-yellow-500 text-white px-2"
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
