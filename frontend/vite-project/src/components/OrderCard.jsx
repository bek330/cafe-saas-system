/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";

function OrderCard({ order, updateStatus }) {
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🎨 Status color styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-300 text-yellow-900 font-bold";
      case "accepted":
        return "bg-blue-300 text-blue-900 font-bold";
      case "completed":
        return "bg-green-300 text-green-900 font-bold";
      case "cancelled":
        return "bg-red-200 text-red-800 font-bold";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className={`p-3 mb-3 rounded shadow transition-all duration-500 ${
        isNew
          ? "bg-yellow-100 border-2 border-yellow-500 shadow-lg scale-[1.02]"
          : "bg-white"
      }`}
    >
      {/* 🧾 Order Info */}
      <p className="font-bold">Order #{order.id}</p>
      <p className="text-xs text-gray-500">
        {new Date(order.created_at).toLocaleTimeString()}
      </p>
      <p className="text-xs text-red-500">
        {Math.floor((Date.now() - new Date(order.created_at)) / 60000)} min ago
      </p>

      {order.table_number && <p>Table: {order.table_number}</p>}

      {/* 🍽 Items */}
      <div className="mt-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>{item.price * item.quantity} ETB</span>
          </div>
        ))}
      </div>

      {/* 💰 Total (FIXED) */}
      <p className="mt-2 font-bold">Total: {order.total} ETB</p>

      {/* 🟢 Status Badge (display only) */}
      <p
        className={`inline-block mt-2 px-2 py-1 rounded text-sm ${getStatusStyle(
          order.status,
        )}`}
      >
        {order.status}
      </p>

      {/* 🎯 Action Buttons */}
      <div className="mt-3 flex flex-col gap-2">
        {order.status === "pending" && (
          <>
            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "accepted");
                setLoading(false);
              }}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
            >
              {loading ? "Processing..." : "Accept"}
            </button>

            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "cancelled");
                setLoading(false);
              }}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </>
        )}

        {order.status === "accepted" && (
          <>
            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "completed");
                setLoading(false);
              }}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
            >
              {loading ? "Processing..." : "Complete"}
            </button>

            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "cancelled");
                setLoading(false);
              }}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </>
        )}

        {order.status === "completed" && (
          <span className="text-gray-500 text-sm italic">Done</span>
        )}

        
        
        {order.status === "cancelled" && (
          <span className="text-red-500 text-sm italic">Cancelled</span>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
