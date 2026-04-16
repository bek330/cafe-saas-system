import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId;
  const total = state?.total;
  const items = state?.items || [];

  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">❌ Order Not Found!</h1>
        <p className="mb-2">The order you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-6 bg-black text-white px-4 py-2 rounded"
        >
          Back to Menu
        </button>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">✅ Order Placed!</h1>

      <p className="mb-2">
        Order: #<strong>{orderId}</strong>
      </p>

      <p className="mb-2">Table Number: {items[0]?.tableNumber || "Not specified"}</p>

      {/* 🔥 ITEMS LIST */}
      <div className="mt-4 w-full max-w-md">
        <h2 className="font-semibold mb-2">Items:</h2>

        {items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-1">
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity} ETB</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-lg font-bold">
        Total: {total} ETB
      </p>

      <button
        onClick={() => navigate("/menu")}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Back to Menu
      </button>
    </div>
  );
}

export default OrderSuccess;