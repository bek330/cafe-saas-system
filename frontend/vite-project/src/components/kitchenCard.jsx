import { useEffect, useState } from "react";

export default function KitchenCard({ order }) {
  // eslint-disable-next-line react-hooks/purity
  const [now, setNow] = useState(Date.now());

  // 🔄 update time every minute (for age)
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const age = Math.floor(
    (now - new Date(order.created_at)) / 60000
  );

  const urgency =
    age > 10
      ? "border-red-500"
      : age > 5
      ? "border-yellow-400"
      : "border-gray-700";

  const statusStyle =
    order.status === "pending"
      ? "bg-yellow-400 text-black"
      : "bg-blue-500 text-white";

  return (
    <div
      className={`bg-gray-100 p-5 rounded-lg border ${urgency} shadow transition-all duration-300 text-black`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">#{order.id}</h2>

        <span className={`text-sm px-2 py-1 rounded ${statusStyle}`}>
          {order.status}
        </span>
      </div>

      {/* AGE */}
      <p
        className={`text-lg font-bold ${
          age > 10 ? "text-red-500" : "text-gray-900"
        }`}
      >
        {age} min
      </p>

      {/* TABLE */}
      {order.table_number && (
        <p className="mb-2">Table: {order.table_number}</p>
      )}

      {/* ITEMS */}
      <div className="space-y-1 text-xl md:text-2xl font-semibold">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <p className="mt-4 font-bold">
        Total: {order.total || order.total_price} ETB
      </p>

      {/* TIME */}
      <p className="mt-3 text-xs text-gray-900">
        {new Date(order.created_at).toLocaleTimeString()}
      </p>
    </div>
  );
}