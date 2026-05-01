import { useEffect, useState } from "react";

const iconOptions = ["🍽️", "☕", "🍹", "🍰", "🥗", "🍕", "🌮", "🍔", "🥐"];

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(iconOptions[0]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState(iconOptions[0]);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    const res = await fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, icon }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to create");
      return;
    }

    setName("");
    setIcon(iconOptions[0]);
    fetchCategories();
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditIcon(cat.icon || iconOptions[0]);
  };

  const handleUpdate = async () => {
    if (!editName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    const res = await fetch(`http://localhost:5000/categories/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: editName, icon: editIcon }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Update failed");
      return;
    }

    setEditingId(null);
    setEditName("");
    setEditIcon(iconOptions[0]);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Delete failed");
      return;
    }

    fetchCategories();
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">Category manager</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage categories</h1>
          <p className="mt-2 text-slate-500">Create, edit, and remove menu categories from the app.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              placeholder="New category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            >
              {iconOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreate}
            className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
          >
            Add category
          </button>
        </div>
      </section>

      <section className="grid gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.icon || "🍽️"}</span>
              {editingId === cat.id ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                />
              ) : (
                <span className="text-lg font-semibold text-slate-900">{cat.name}</span>
              )}
            </div>

            {editingId === cat.id && (
              <select
                value={editIcon}
                onChange={(e) => setEditIcon(e.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              >
                {iconOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            <div className="flex flex-wrap gap-3">
              {editingId === cat.id ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(cat)}
                    className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminCategories;
