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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Your order</h2>
        <p className="mt-1 text-sm text-slate-500">Review your items and place your order.</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500">Your cart is empty.</p>
          <p className="mt-2 text-sm text-slate-400">Add some delicious items to get started.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.price} ETB each</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-6 w-6 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {item.price * item.quantity} ETB
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Total</span>
              <span className="text-lg font-semibold text-slate-900">{total} ETB</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Table number (optional)"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700 disabled:opacity-50"
            >
              {placing ? "Placing order..." : "Place order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
