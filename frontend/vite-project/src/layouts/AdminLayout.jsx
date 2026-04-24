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
      <div className="w-64 bg-gray-800 rounded text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <Link to="/admin" className="block rounded hover:text-gray-300   transition">
          Dashboard
        </Link>
        <Link to="/admin/menu" className="block rounded hover:text-gray-300 transition">
          Menu
        </Link>
        <Link to="/admin/categories" className="block rounded hover:text-gray-300 transition">
          Categories
        </Link>

        <button onClick={handleLogout} className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;