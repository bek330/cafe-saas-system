import { useCart } from "../contexts/useCart";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Receipt, Trash2 } from "lucide-react";

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
    <div className="max-w-md mx-auto relative">
      <div className="bg-white shadow-2xl overflow-hidden pt-8 px-6 pb-12 relative border-t-8 border-oat-gold">
        {/* Receipt Header */}
        <div className="text-center mb-8">
          <Receipt className="w-12 h-12 text-oat-gold mx-auto mb-2" />
          <h2 className="text-2xl font-serif font-black uppercase tracking-tighter text-charcoal">Your Receipt</h2>
          <div className="flex items-center justify-center gap-2 text-sage text-sm font-mono mt-1">
            <span>{new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 border-y-2 border-dashed border-slate-200">
            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-sage font-serif italic">Your cart is empty</p>
            <button
              onClick={() => navigate("/menu")}
              className="mt-4 text-oat-gold font-bold hover:underline"
            >
              Start ordering
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8 font-mono text-sm">
              <div className="flex justify-between text-xs font-bold text-sage uppercase border-b border-dashed border-slate-200 pb-2">
                <span>Item</span>
                <span>Total</span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 border-b border-dashed border-slate-100 pb-4">
                  <div className="flex justify-between items-start">
                    <span className="text-charcoal font-bold uppercase">{item.name}</span>
                    <span className="text-charcoal font-bold">{item.price * item.quantity} ETB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="p-1 hover:bg-cream rounded transition-colors text-charcoal"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center bg-cream px-2 py-0.5 rounded text-xs font-bold">
                        x{item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="p-1 hover:bg-cream rounded transition-colors text-charcoal"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sage text-[10px]">{item.price} ETB / unit</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-slate-300 pt-6 mb-8">
              <div className="flex items-center justify-between text-2xl font-serif font-black text-charcoal">
                <span className="uppercase tracking-tighter">Total</span>
                <span>{total} ETB</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-sage mb-2">Table Number</label>
                <input
                  type="number"
                  placeholder="e.g. 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-cream border-2 border-transparent focus:border-oat-gold rounded-none font-mono text-sm outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full bg-charcoal text-cream py-4 text-sm font-black uppercase tracking-[0.2em] shadow-xl hover:bg-charcoal/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {placing ? "Processing..." : "Confirm Order"}
                </button>
                <button
                  onClick={clearCart}
                  className="flex items-center justify-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Discard Receipt
                </button>
              </div>
            </div>
          </>
        )}

        {/* Zig-zag bottom edge using SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[20px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.32,37.5,102.74,30,204.49,27,302.63,0,121.72-33.43,207.29-37.5,314.25,0V0Z" fill="#FDFBF7" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.94,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,33.76-16.48,64.76-42,100.59-46.78,11.08-1.48,22.21-1.39,33.22,0V0Z" fill="#FDFBF7" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FDFBF7"></path>
          </svg>
        </div>
      </div>
      
      {/* Receipt decorative dots */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="w-6 h-6 rounded-full bg-cream shadow-inner"></div>)}
      </div>
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="w-6 h-6 rounded-full bg-cream shadow-inner"></div>)}
      </div>
    </div>
  );
}

export default Cart;
