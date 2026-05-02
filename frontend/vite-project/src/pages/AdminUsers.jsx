import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user?.role !== "admin") {
    return (
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-rose-600">Access denied</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Admin only</h1>
          <p className="mt-2 text-slate-500">You don't have permission to manage users.</p>
        </section>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!form.username || (!editingId && !form.password) || !form.role) {
      alert("All fields required");
      return;
    }

    const url = editingId ? `http://localhost:5000/users/${editingId}` : "http://localhost:5000/users";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Failed");
      return;
    }

    resetForm();
    fetchUsers();
  };

  const resetForm = () => {
    setForm({
      username: "",
      password: "",
      role: "user",
    });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      password: "",
      role: user.role,
    });
    setEditingId(user.id);
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    fetchUsers();
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">User management</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage system users</h1>
        <p className="mt-2 text-slate-500">Add, edit, or remove users with role-based access control.</p>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">User form</h2>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
            <input
              placeholder={editingId ? "New password (leave empty to keep)" : "Password"}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div className="space-y-4">
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={handleSubmit}
              className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700"
            >
              {editingId ? "Update user" : "Add user"}
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
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-[1.75rem] bg-slate-100 animate-pulse"></div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-6 shadow-xl text-slate-500">No users found.</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{user.username}</p>
                  <p className="text-sm text-slate-500">Role: {user.role}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {user.role}
                  </span>
                  <span className="text-sm text-slate-500">
                    Created {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">ID: {user.id}</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                  >
                    Delete
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

export default AdminUsers;