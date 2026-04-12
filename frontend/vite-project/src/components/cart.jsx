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
        }))
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
    <>
      <h2 className="font-bold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-3">
              <p>{item.name}</p>

              <div className="flex justify-between">
                <span>{item.price}</span>

                <div>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 font-bold">Total: {total} ETB</div>

          <input
            type="number"
            placeholder="Table number (optional)"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            {placing ? "Placing..." : "Place Order"}
          </button>
        </>
      )}
    </>
  );
}

export default Cart;
