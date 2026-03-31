import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div>
      {/* SIDEBAR */}
      <div>
        <h2>Admin</h2>

        <nav>
          <Link to="/admin">Orders</Link>

          <Link to="/admin/menu-list">Menu List</Link>

          <Link to="/admin/new-menu">Add Menu Item</Link>

          <Link to="/admin/categories">Categories</Link>
        </nav>
      </div>

      {/* CONTENT */}
      <div>{children}</div>
    </div>
  );
}

export default AdminLayout;
