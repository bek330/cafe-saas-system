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
      {/* Receipt "Paper" Container */}
      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-[0_30px_60px_-15px_rgba(61,43,31,0.15)] overflow-hidden relative border-x border-safeland-wood/5"
      >
        {/* Top Zig-Zag Edge */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-4 rotate-180">
          <svg className="relative block w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 0 L5 10 L10 0 L15 10 L20 0 L25 10 L30 0 L35 10 L40 0 L45 10 L50 0 L55 10 L60 0 L65 10 L70 0 L75 10 L80 0 L85 10 L90 0 L95 10 L100 0 V20 H0 Z" fill="#F4F1ED" />
          </svg>
        </div>

        {/* Subtle Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>

        {/* Receipt Header */}
        <div className="relative z-10 text-center pt-16 pb-10 px-8">
          <h2 className="text-2xl font-serif font-bold uppercase tracking-[0.3em] text-safeland-wood mb-1">Safeland Cafe</h2>
          <p className="text-[10px] text-safeland-grain uppercase tracking-widest opacity-60 mb-6">Artisanal Experience</p>
          
          <div className="w-12 h-12 bg-safeland-paper rounded-full flex items-center justify-center mx-auto mb-8 border border-safeland-wood/5">
            <IoReceiptOutline className="w-6 h-6 text-safeland-crema" />
          </div>

          <div className="flex flex-col gap-1 text-safeland-grain text-[9px] font-bold tracking-[0.1em] uppercase opacity-40">
            <span>Date: {new Date().toLocaleDateString()}</span>
            <span>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>Order Type: Table Service</span>
          </div>
        </div>

        <div className="relative z-10 px-8">
          {cart.length === 0 ? (
            <div className="text-center py-24 border-y border-dashed border-safeland-wood/10">
              <IoBagHandleOutline className="w-16 h-16 text-safeland-wood mx-auto mb-4 opacity-10" />
              <p className="text-safeland-grain font-serif italic text-base mb-8">Your receipt is empty...</p>
              <button
                onClick={() => navigate("/menu")}
                className="text-safeland-crema font-bold uppercase tracking-widest text-[10px] hover:text-safeland-wood transition-colors"
              >
                + Select Items
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12">
                {/* Table Header */}
                <div className="flex justify-between text-[9px] font-black text-safeland-wood uppercase tracking-[0.2em] border-b border-dashed border-safeland-wood/10 pb-4">
                  <span>Item Description</span>
                  <span>Price</span>
                </div>
                
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <Motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4 border-b border-dashed border-safeland-wood/5 pb-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-safeland-wood text-base font-serif font-medium tracking-tight block">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-safeland-grain text-[9px] font-bold uppercase tracking-widest">
                            Unit: {item.price} <span className="opacity-60 text-[8px]">ETB</span>
                          </span>
                        </div>
                        <span className="text-safeland-wood font-mono text-sm font-bold">
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-safeland-paper/50 p-1 rounded-lg border border-safeland-wood/5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-safeland-wood/40 hover:text-safeland-wood hover:bg-white rounded transition-all"
                          >
                            <IoRemoveOutline size={14} />
                          </button>
                          <span className="w-8 text-center text-safeland-wood font-mono text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-safeland-wood/40 hover:text-safeland-wood hover:bg-white rounded transition-all"
                          >
                            <IoAddOutline size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="text-red-900/20 hover:text-red-600 transition-colors p-2"
                        >
                          <IoTrashOutline size={16} />
                        </button>
                      </div>
                    </Motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Total Section */}
              <div className="border-t-2 border-dashed border-safeland-wood/10 pt-8 mb-12">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-serif font-bold text-safeland-wood uppercase tracking-tighter italic">Total Amount</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-mono font-bold text-safeland-crema">{total.toFixed(2)}</span>
                    <span className="text-[8px] font-black text-safeland-wood/40 uppercase tracking-[0.3em]">ETB</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 pb-20">
                <div className="space-y-4">
                  <div className="h-px w-full bg-safeland-wood/5"></div>
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-safeland-wood/40">Table Number</label>
                    <input
                      type="number"
                      placeholder="table #"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-24 text-right text-safeland-wood/40 font-mono font-bold bg-transparent border-b border-safeland-wood/5 focus:border-safeland-wood focus:outline-none transition-all"
                    />
                  </div>
                  <div className="h-px w-full bg-safeland-wood/5"></div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="w-full bg-sage text-oat-gold font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-sage/90 hover:text-oat-gold/90 hover:animate-bounce transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {placing ? "Processing..." : "Submit Selection"}
                  </button>
                  
                  <div className="text-center pt-4">
                    <p className="text-[9px] text-safeland-grain/40 font-bold uppercase tracking-[0.2em] mb-4 italic">Thank you for visiting Safeland</p>
                    <button
                      onClick={clearCart}
                      className="text-[8px] font-black uppercase tracking-[0.4em] text-red-900/30 hover:text-red-600 transition-colors"
                    >
                      Void Receipt
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Zig-Zag Edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] h-6">
          <svg className="relative block w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 0 L5 10 L10 0 L15 10 L20 0 L25 10 L30 0 L35 10 L40 0 L45 10 L50 0 L55 10 L60 0 L65 10 L70 0 L75 10 L80 0 L85 10 L90 0 L95 10 L100 0 V20 H0 Z" fill="#3c2a21" />
          </svg>
        </div>
      </Motion.div>
    </div>
  );
}

export default Cart;
