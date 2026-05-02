import { useCart } from "../contexts/useCart";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      const total = response.total || response.total_price;

      navigate(`/success/${orderId}`, {
        state: {
          orderId,
          total,
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Your Order</h2>
        <p className="text-sage">Review your items and complete your order</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🛒</div>
          <p className="text-sage mb-2">Your cart is empty</p>
          <p className="text-sm text-charcoal">Add some delicious items to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-cream rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-charcoal">{item.name}</p>
                  <p className="text-sage text-sm">{item.price} ETB each</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white rounded-full border border-slate-300 px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-oat-gold hover:bg-oat-gold hover:text-charcoal rounded-full transition-colors"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-oat-gold hover:bg-oat-gold hover:text-charcoal rounded-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-charcoal">
                    {item.price * item.quantity} ETB
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 mb-6">
            <div className="flex items-center justify-between text-xl font-serif font-bold text-charcoal">
              <span>Total</span>
              <span>{total} ETB</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Table Number (Optional)</label>
              <input
                type="number"
                placeholder="Enter table number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-3xl focus:ring-2 focus:ring-oat-gold focus:border-transparent outline-none transition-colors"
              />
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full rounded-3xl bg-oat-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-oat-gold/20 transition hover:bg-oat-gold/80 disabled:opacity-50"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
