import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className=" bg-slate-900 p-6 text-white shadow-[0_25px_50px_-12px_rgba(15,23,42,0.4)]">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <p className="mt-2 text-sm text-slate-300">
          Manage menu items, categories, and order flow.
        </p>
      </div>

      <nav className="space-y-3 text-sm">
        <Link
          to="/admin/dashboard"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/orders"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
        >
          Orders
        </Link>
        <Link
          to="/admin/menu"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
        >
          Menu
        </Link>
        <Link
          to="/admin/categories"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
        >
          Categories
        </Link>
        {user?.role === "admin" && (
          <Link
            to="/admin/users"
            className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
          >
            Users
          </Link>
        )}
        <Link
          to="/admin/history"
          className="block rounded-xl px-4 py-3 hover:bg-slate-800 transition"
        >
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
  );
}
