import { useEffect, useState } from "react";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

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

  // ➕ CREATE
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
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed to create");
      return;
    }

    setName("");
    fetchCategories();
  };

  // ✏️ START EDIT
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  // 💾 SAVE EDIT
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
      body: JSON.stringify({ name: editName }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Update failed");
      return;
    }

    setEditingId(null);
    setEditName("");
    fetchCategories();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this category?");
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
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {/* CREATE */}
      <div className="mb-6 space-x-2">
        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded "
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded "
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {editingId === cat.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 rounded"
                />
                <div className="space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-2 rounded hover:bg-green-600 transition-ease-in-out duration-200 "
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 px-2 rounded hover:bg-gray-500 transition-ease-in-out duration-200 "
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600 transition-ease-in-out duration-200 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600 transition-ease-in-out duration-200 "
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
