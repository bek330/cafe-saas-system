import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Cart from "../components/cart";
import Footer from "../components/Footer";
import { useCart } from "../contexts/useCart";
import { motion as Motion, AnimatePresence } from "framer-motion";

function OrderLayout() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-coffee-250 flex flex-col selection:bg-coffee-400 selection:text-coffee-900">
      <Header />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 px-4 py-8 md:py-16 lg:flex-row items-start flex-1">
        <main className="flex-1 w-full bg-coffee-200 rounded-[3rem] shadow-2xl p-6 md:p-16 border border-white/5 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle light effect in the corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-400/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>

        <AnimatePresence>
          {cart.length > 0 && (
            <Motion.aside 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full lg:w-[400px] sticky top-28"
            >
              <Cart />
            </Motion.aside>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default OrderLayout;
