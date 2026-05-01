import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/menu" className="text-2xl font-semibold tracking-tight text-slate-900">
          Café Menu
        </Link>
        <p className="text-sm text-slate-500">Discover fresh dishes in a modern menu experience.</p>
      </div>
    </header>
  );
}

export default Header;
