import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/menu" className="text-2xl font-serif font-bold text-charcoal">
          Café Menu
        </Link>
        <p className="text-sage">Fresh dishes, great experiences</p>
      </div>
    </header>
  );
}

export default Header;
