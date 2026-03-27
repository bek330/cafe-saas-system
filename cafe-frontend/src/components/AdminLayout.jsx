import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          background: "#222",
          color: "#fff",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <h3>Admin</h3>

        <nav>
          <div><Link to="/admin" style={{ color: "#fff" }}>Orders</Link></div>
          <div><Link to="/admin/add-item" style={{ color: "#fff" }}>Add Item</Link></div>
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;