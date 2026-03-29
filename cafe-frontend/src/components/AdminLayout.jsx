import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#747474",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{color: "#fff"}}>Admin</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/admin" style={{ color: "#fff" }}>
            Orders
          </Link>

          <Link to="/admin/menu-list" style={{ color: "#fff" }}>
            Menu List
          </Link>


          <Link to="/admin/new-menu" style={{ color: "#fff" }}>
            Add Menu Item
          </Link>


          <Link to="/admin/categories" style={{ color: "#fff" }}>
            Categories
          </Link>
        </nav>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;