import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  // Only show login/logout on admin pages
  const isAdmin = location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div className="w-full border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Café Menu
      </Link>
      {isAdmin && (
        <div>{/* Login/Logout handled in AdminLayout */}</div>
      )}
    </div>
  );
}

export default Header;
