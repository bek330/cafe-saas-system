import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUsers, createUser, updateUser, deleteUser as deleteUserApi } from "../api/userApi";
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Shield, 
  ShieldCheck,
  ShieldAlert,
  Calendar,
  X
} from "lucide-react";

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

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUsers().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
     
  }, [user]);

  if (user?.role !== "admin") {
    return (
      <div className="space-y-8 bg-cream min-h-screen p-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-red-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 rounded-2xl">
              <ShieldAlert className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-500 font-bold">Access denied</p>
              <h1 className="mt-1 text-4xl font-serif font-black text-charcoal">Admin only</h1>
            </div>
          </div>
          <p className="mt-2 text-sage italic">You don't have permission to manage users. Please contact the system administrator.</p>
        </section>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!form.username || (!editingId && !form.password) || !form.role) {
      alert("All fields required");
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, form);
      } else {
        await createUser(form);
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      alert(err.message || "Failed");
    }
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

    try {
      await deleteUserApi(id);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };


  return (
    <div className="space-y-8 bg-cream min-h-screen p-6">
      <section className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-oat-gold font-bold">User management</p>
          <h1 className="mt-3 text-4xl font-serif font-black text-charcoal">Manage System Users</h1>
          <p className="mt-2 text-sage italic">Add, edit, or remove users with role-based access control.</p>
        </div>

        <div className="bg-cream/30 p-8 rounded-[2.5rem] border border-dashed border-sage/20">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Username</label>
                <input
                  placeholder="e.g. barista_mike"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">
                  {editingId ? "New Password (Optional)" : "Password"}
                </label>
                <input
                  placeholder={editingId ? "Leave blank to keep current" : "Secure password"}
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-full border-2 border-transparent bg-white px-6 py-4 text-charcoal shadow-sm focus:border-oat-gold focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2 ml-4">Assign Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {['user', 'admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setForm({ ...form, role })}
                      className={`flex items-center justify-center gap-2 rounded-full py-4 px-6 text-xs font-black uppercase tracking-widest transition-all ${
                        form.role === role 
                        ? 'bg-charcoal text-cream shadow-lg scale-105' 
                        : 'bg-white text-sage border-2 border-transparent hover:border-oat-gold/30'
                      }`}
                    >
                      {role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-full bg-charcoal px-8 py-5 text-sm font-black text-cream shadow-xl shadow-charcoal/20 transition hover:bg-charcoal/90 active:scale-95 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {editingId ? "Update User" : "Add User"}
                </button>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="rounded-full bg-white border-2 border-slate-100 px-8 py-5 text-sm font-black text-charcoal uppercase tracking-widest transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        {loading ? (
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 rounded-[2.5rem] bg-white animate-pulse border border-slate-50 shadow-sm"></div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-[2.5rem] bg-white p-12 text-center border border-dashed border-sage/20 shadow-sm">
            <Users className="w-12 h-12 text-sage/20 mx-auto mb-4" />
            <p className="text-sage font-medium italic">No users found.</p>
          </div>
        ) : (
          users.map((u) => (
            <div
              key={u.id}
              className="group relative flex flex-col md:flex-row gap-6 rounded-[2.5rem] border border-white bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-6 flex-1">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${u.role === 'admin' ? 'bg-oat-gold/10' : 'bg-cream'}`}>
                  {u.role === 'admin' ? <ShieldCheck className="w-8 h-8 text-oat-gold" /> : <Users className="w-8 h-8 text-sage" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-serif font-black text-charcoal group-hover:text-oat-gold transition-colors">{u.username}</h3>
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-charcoal text-cream' : 'bg-oat-gold/20 text-charcoal'}`}>
                      {u.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-sage" />
                      <p className="text-[10px] text-sage font-black uppercase tracking-widest">Joined {new Date(u.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <p className="text-[10px] text-sage font-black uppercase tracking-widest">ID: #{u.id}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => handleEdit(u)}
                  className="flex-1 md:flex-none rounded-full bg-oat-gold px-6 py-3 text-xs font-black text-charcoal transition-all hover:bg-oat-gold/90 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="flex-1 md:flex-none rounded-full bg-white border-2 border-red-50 px-6 py-3 text-xs font-black text-red-400 transition-all hover:bg-red-50 hover:border-red-100 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AdminUsers;