import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="w-full max-w-sm rounded-[2rem] bg-slate-900 p-6 text-white shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
            <p className="mt-2 text-sm text-slate-300">Manage menu items, categories, and order flow.</p>
          </div>

          <nav className="space-y-3 text-sm">
            <Link to="/admin" className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Dashboard
            </Link>
            <Link to="/admin/menu" className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Menu
            </Link>
            <Link to="/admin/categories" className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Categories
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin/users" className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition">
                Users
              </Link>
            )}
            <Link to="/admin/history" className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Order History
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-full bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 rounded-[2rem] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.15)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;