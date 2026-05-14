import { useEffect, useState } from "react";
import { CheckCircle, Play } from "lucide-react";

export default function KitchenCard({ order, onStatusUpdate }) {
  const [now, setNow] = useState(() => Date.now());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUpdate = async () => {
    if (!onStatusUpdate) return;
    setIsUpdating(true);
    const nextStatus = order.status === "pending" ? "accepted" : "completed";
    await onStatusUpdate(order.id, nextStatus);
    setIsUpdating(false);
  };

  const age = Math.floor((now - new Date(order.created_at)) / 60000);

  const urgency =
    age > 10 ? "border-rose-500 bg-rose-50" : age > 5 ? "border-amber-400 bg-amber-50" : "border-slate-300 bg-slate-50";

  const statusStyle =
    order.status === "pending"
      ? "bg-amber-500 text-white"
      : "bg-blue-500 text-white";

  return (
    <div className={`flex flex-col rounded-[1.75rem] border p-6 shadow-sm transition hover:shadow-md ${urgency}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">#{order.id}</h2>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}>
          {order.status}
        </span>
      </div>

      <div className="mb-4">
        <p className={`text-2xl font-bold ${age > 10 ? "text-rose-600" : "text-slate-900"}`}>
          {age} min
        </p>
        <p className="text-sm text-slate-500">since order placed</p>
      </div>

      {order.table_number && (
        <p className="mb-4 text-sm text-slate-600">Table: {order.table_number}</p>
      )}

      <div className="space-y-2 mb-4 flex-grow">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-lg font-semibold">
            <span className="text-slate-900">{item.name}</span>
            <span className="text-slate-700">x{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 py-4">
        <span className="text-sm font-semibold text-slate-900">Total</span>
        <span className="text-sm font-semibold text-slate-900">{order.total || order.total_price} ETB</span>
      </div>

      <div className="mt-auto space-y-4">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 ${
            order.status === "pending"
              ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
          } shadow-lg`}
        >
          {isUpdating ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : order.status === "pending" ? (
            <>
              <Play className="h-5 w-5" />
              Accept Order
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Mark as Ready
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500">
          {new Date(order.created_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}