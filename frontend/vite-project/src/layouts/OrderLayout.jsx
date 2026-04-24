import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";

function OrderLayout() {
  return (
    <div className="flex flex-col min-h-screen rounded-lg bg-gray-100 shadow-lg">

      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT + CART */}
      <div className="flex flex-1 rounded-lg overflow-hidden">

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 rounded-lg bg-white shadow">
          <Outlet />
        </div>

        {/* CART (FIXED RIGHT) */}
        <div className="w-80 border-l p-4 rounded-lg bg-white shadow">
          <Cart />
        </div>

      </div>
    </div>
  );
}

export default OrderLayout;