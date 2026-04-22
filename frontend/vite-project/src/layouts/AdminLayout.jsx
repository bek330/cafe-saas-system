import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <Link to="/admin" className="block">Dashboard</Link>
        <Link to="/admin/menu" className="block">Menu</Link>
        <Link to="/admin/categories" className="block">Categories</Link>

        <button onClick={handleLogout} className="mt-6 bg-red-500 px-2 py-1">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;