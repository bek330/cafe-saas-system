import { Link } from "react-router-dom";
import { Coffee, Menu as MenuIcon, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-800 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Coffee className="text-white" size={24} />
          </div>
          <span className="text-2xl font-serif font-bold text-stone-800 tracking-tight">
            Bloom <span className="text-orange-700">Café</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/menu" 
            className="flex items-center gap-2 text-stone-600 hover:text-orange-800 font-medium transition-colors"
          >
            <MenuIcon size={20} />
            <span>Menu</span>
          </Link>
          <Link 
            to="/cart" 
            className="bg-stone-800 text-white p-2.5 rounded-full hover:bg-stone-700 transition-colors relative"
          >
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
