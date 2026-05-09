import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-hidden">
        <div className="h-full rounded-[2rem] bg-white p-6 md:p-8 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.15)] overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
