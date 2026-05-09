import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Utensils, 
  Grid, 
  Users, 
  History, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Menu", path: "/admin/menu", icon: Utensils },
    { name: "Categories", path: "/admin/categories", icon: Grid },
    { name: "History", path: "/admin/history", icon: History },
  ];

  // Logic to insert Users link if admin
  const displayItems = [...navItems];
  if (user?.role === "admin") {
    displayItems.splice(4, 0, { name: "Users", path: "/admin/users", icon: Users });
  }

  return (
    <aside 
      className={`relative flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-slate-400 mt-1">Management Suite</p>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        {displayItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon; // Capitalize for React component usage
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon 
                size={22} 
                strokeWidth={2.5}
                className={isActive ? "text-white" : "text-slate-400 group-hover:text-white"} 
              />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap overflow-hidden">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}

      </nav>

      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 px-3 py-3 w-full rounded-xl transition-all duration-200 text-slate-400 hover:bg-rose-600 hover:text-white group`}
        >
          <LogOut size={22} strokeWidth={2.5} className="text-slate-400 group-hover:text-white" />
          {!isCollapsed && (
            <span className="font-medium whitespace-nowrap overflow-hidden text-left">
              Logout
            </span>
          )}
        </button>
      </div>

    </aside>
  );
}
