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

  const fetchMenu = async () => {
    const res = await fetch("http://localhost:5000/menu");
    const data = await res.json();
    setItems(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchMenu();
      await fetchCategories();
    };

    loadData();
  }, []);

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
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">Menu manager</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage menu items</h1>
        <p className="mt-2 text-slate-500">Create, edit, or toggle availability for menu items in the kitchen menu.</p>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Item form</h2>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
            <input
              placeholder="Image URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100 md:col-span-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="md:col-span-2 h-28 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div className="space-y-4">
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
            >
              {editingId ? "Update item" : "Add item"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="w-full rounded-3xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Cancel edit
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {items.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 shadow-xl text-slate-500">No menu items found.</div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.description || "No description"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-sm text-slate-500">{item.price} ETB</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">Category: {categories.find((c) => c.id === item.category_id)?.name || "Unknown"}</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    {item.is_available ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AdminMenu;
