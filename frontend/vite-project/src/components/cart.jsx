import { useCart } from "../contexts/useCart";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  IoRemoveOutline, 
  IoAddOutline, 
  IoBagHandleOutline, 
  IoReceiptOutline, 
  IoTrashOutline,
  IoCafeOutline,
  IoChevronForwardOutline
} from "react-icons/io5";

function Cart() {
  const { cart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [tableNumber, setTableNumber] = useState("");

  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) return;
      setPlacing(true);

      const orderData = {
        table_number: tableNumber ? Number(tableNumber) : null,
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);
      const orderId = response.orderId || response.id;
      const totalAmount = response.total || response.total_price;

      navigate(`/success/${orderId}`, {
        state: {
          orderId,
          total: totalAmount,
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            tableNumber: tableNumber ? Number(tableNumber) : null,
          })),
        },
      });

      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto relative pt-10 pb-20">
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-coffee-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative border-t-[12px] border-coffee-400 rounded-b-[3rem] border-x border-b border-coffee-800/50"
      >
        {/* Aesthetic Background Detail */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a68a6d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Receipt Header */}
        <div className="relative z-10 text-center pt-12 pb-10 px-8">
          <div className="w-16 h-16 bg-coffee-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-coffee-700/30">
            <IoReceiptOutline className="w-8 h-8 text-coffee-400" />
          </div>
          <h2 className="text-3xl font-serif font-light uppercase tracking-widest text-coffee-50">Your <span className="italic">Selection</span></h2>
          <div className="flex items-center justify-center gap-3 text-coffee-500 text-[10px] font-black tracking-[0.2em] mt-4 uppercase">
            <span>{new Date().toLocaleDateString()}</span>
            <span className="w-1 h-1 rounded-full bg-coffee-700"></span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="relative z-10 px-8">
          {cart.length === 0 ? (
            <div className="text-center py-20 border-y border-dashed border-coffee-800/50">
              <IoBagHandleOutline className="w-20 h-20 text-coffee-800 mx-auto mb-6 opacity-40" />
              <p className="text-coffee-400 font-serif italic text-lg mb-8">The cart is waiting for your choice.</p>
              <button
                onClick={() => navigate("/menu")}
                className="group flex items-center justify-center gap-2 mx-auto text-coffee-300 font-black uppercase tracking-widest text-xs transition-colors hover:text-white"
              >
                Start Exploring
                <IoChevronForwardOutline className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-[10px] font-black text-coffee-600 uppercase tracking-[0.3em] border-b border-dashed border-coffee-800/50 pb-4">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <Motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-col gap-4 border-b border-dashed border-coffee-800/30 pb-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-coffee-50 text-lg font-serif italic tracking-wide block">{item.name}</span>
                          <span className="text-coffee-500 text-[9px] font-black uppercase tracking-widest">{item.price} ETB / Unit</span>
                        </div>
                        <span className="text-coffee-50 font-serif text-lg">{item.price * item.quantity}.00</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-coffee-800/50 p-1 rounded-xl border border-coffee-700/30">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-coffee-400 hover:text-white hover:bg-coffee-700 rounded-lg transition-all"
                          >
                            <IoRemoveOutline size={16} />
                          </button>
                          <span className="w-10 text-center text-coffee-50 font-serif text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-coffee-400 hover:text-white hover:bg-coffee-700 rounded-lg transition-all"
                          >
                            <IoAddOutline size={16} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="text-red-400/40 hover:text-red-400 transition-colors p-2"
                        >
                          <IoTrashOutline size={18} />
                        </button>
                      </div>
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t-2 border-dashed border-coffee-700/50 pt-8 mb-12">
                <div className="flex items-center justify-between text-3xl font-serif font-light text-white">
                  <span className="uppercase tracking-tighter italic">Total</span>
                  <div className="flex flex-col items-end">
                    <span className="text-coffee-400">{total}.00</span>
                    <span className="text-[9px] font-black text-coffee-600 uppercase tracking-[0.4em]">Ethiopian Birr</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 pb-16">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-coffee-600 ml-1">Service Point / Table</label>
                  <input
                    type="number"
                    placeholder="Enter Table Number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-6 py-5 bg-coffee-800/30 border border-coffee-700/50 focus:border-coffee-400 rounded-2xl font-serif text-coffee-50 outline-none transition-all placeholder:text-coffee-700 placeholder:italic"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="group relative w-full bg-coffee-400 text-coffee-900 py-6 text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-coffee-300 disabled:opacity-30 transition-all overflow-hidden"
                  >
                    <span className="relative z-10">{placing ? "Processing Order..." : "Confirm Selection"}</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="flex items-center justify-center gap-2 text-coffee-600 text-[9px] font-black uppercase tracking-[0.4em] hover:text-red-400 transition-colors"
                  >
                    Discard Current Receipt
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Improved zig-zag bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] h-6">
          <svg className="relative block w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 0 L5 10 L10 0 L15 10 L20 0 L25 10 L30 0 L35 10 L40 0 L45 10 L50 0 L55 10 L60 0 L65 10 L70 0 L75 10 L80 0 L85 10 L90 0 L95 10 L100 0 V20 H0 Z" fill="#3c2a21" />
          </svg>
        </div>
      </Motion.div>
      
      {/* Receipt decorative details */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-20">
        {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 rounded-full bg-coffee-800 shadow-inner"></div>)}
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-20">
        {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 rounded-full bg-coffee-800 shadow-inner"></div>)}
      </div>
    </div>
  );
}

export default Cart;
