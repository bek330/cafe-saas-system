import { useEffect, useState } from "react";

function OrderCard({ order, updateStatus }) {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🎨 Status color styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "accepted":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div
      className={`p-3 mb-3 rounded shadow transition-all duration-500 ${
        isNew
          ? "bg-yellow-100 border-2 border-yellow-400 scale-[1.02]"
          : "bg-white"
      }`}
    >
      {/* 🧾 Order Info */}
      <p className="font-bold">Order #{order.id}</p>
      <p className="text-xs text-gray-500">
        {new Date(order.created_at).toLocaleTimeString()}
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
      <p className="mt-2 font-bold">Total: {order.total_price} ETB</p>

      {/* 🟢 Status Badge (display only) */}
      <p
        className={`inline-block mt-2 px-2 py-1 rounded text-sm ${getStatusStyle(
          order.status,
        )}`}
      >
        {order.status}
      </p>

      {/* 🎯 Action Buttons */}
      <div className="mt-3 flex gap-2">
        {order.status === "pending" && (
          <button
            onClick={() => updateStatus(order.id, "accepted")}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Accept
          </button>
        )}

        {order.status === "accepted" && (
          <button
            onClick={() => updateStatus(order.id, "completed")}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Complete
          </button>
        )}

        {order.status === "completed" && (
          <span className="text-gray-500 text-sm italic">Done</span>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
