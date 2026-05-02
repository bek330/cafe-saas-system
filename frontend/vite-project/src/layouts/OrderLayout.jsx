import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";
import { useCart } from "../contexts/useCart";

function OrderLayout() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="max-w-7xl mx-auto flex flex-col gap-8 px-4 py-8 lg:flex-row">
        <main className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <Outlet />
        </main>

        {cart.length > 0 && (
          <aside className="w-full lg:w-96">
            <div className="sticky top-8">
              <Cart />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default OrderLayout;