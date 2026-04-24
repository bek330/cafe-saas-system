import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full border-b p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Café Menu
      </Link>
    </div>
  );
}

export default Header;
