import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";
import Footer from "../components/Footer";
import { useCart } from "../contexts/useCart";


function OrderLayout() {
  const { cart } = useCart();

  return (
    <section className="min-h-screen bg-coffee-950">
      <Header />

      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4 py-6 md:py-12 lg:flex-row">
        <main className="flex-1 bg-coffee-900/50 rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-white/5 backdrop-blur-sm">
          <Outlet />
        </main>

        {cart.length > 0 && (
          <aside className="w-full lg:w-96">
            <div className="sticky top-24">
              <Cart />
            </div>
          </aside>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default OrderLayout;