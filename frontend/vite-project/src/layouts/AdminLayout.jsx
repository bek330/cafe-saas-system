import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";


function AdminLayout() {
 
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <Sidebar />

        <main className="flex-1 rounded-[2rem] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.15)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;