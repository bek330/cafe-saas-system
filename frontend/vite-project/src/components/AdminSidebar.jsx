import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Grid, 
  Users, 
  History, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Coffee
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
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
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
      className={`relative flex flex-col bg-charcoal text-white transition-all duration-500 ease-in-out border-r border-white/5 shadow-2xl ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="p-8 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="p-2 bg-oat-gold rounded-xl">
              <Coffee className="text-charcoal w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-black tracking-tighter text-white">CAFÉ CMS</h2>
              <p className="text-[10px] text-oat-gold font-black uppercase tracking-widest">Management</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto p-2 bg-oat-gold rounded-xl">
            <Coffee className="text-charcoal w-6 h-6" />
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-20 p-1.5 rounded-full bg-oat-gold text-charcoal shadow-xl hover:scale-110 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
        >
          <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {displayItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-[1.25rem] transition-all duration-300 group ${
                isActive 
                  ? "bg-oat-gold text-charcoal shadow-xl shadow-oat-gold/10 scale-[1.02]" 
                  : "text-sage hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 3 : 2}
                className={isActive ? "text-charcoal" : "text-sage group-hover:text-oat-gold transition-colors"} 
              />
              {!isCollapsed && (
                <span className={`font-black text-xs uppercase tracking-[0.15em] whitespace-nowrap overflow-hidden ${isActive ? 'text-charcoal' : ''}`}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="p-4 bg-white/5 rounded-[1.5rem] border border-white/5">
          {!isCollapsed && (
            <div className="mb-4 px-2">
              <p className="text-[10px] text-sage font-black uppercase tracking-widest mb-1">Logged in as</p>
              <p className="text-xs font-bold text-white truncate">{user?.username || 'Admin'}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-300 text-sage hover:bg-red-500/10 hover:text-red-400 group border border-transparent hover:border-red-500/20`}
          >
            <LogOut size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            {!isCollapsed && (
              <span className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap overflow-hidden text-left">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
