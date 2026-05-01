import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";
import { useCart } from "../contexts/useCart";

function OrderLayout() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <main className="flex-1 rounded-[2rem] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.2)]">
          <Outlet />
        </main>

        {cart.length > 0 && (
          <aside className="w-full lg:w-80">
            <div className="sticky top-6 rounded-[2rem] bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.1)] border border-slate-200">
              <Cart />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default OrderLayout;