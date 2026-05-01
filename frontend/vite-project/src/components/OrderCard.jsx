/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";

function OrderCard({ order, updateStatus }) {
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div
      className={`rounded-[1.75rem] border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        isNew ? "ring-2 ring-amber-200" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">Order #{order.id}</p>
          <p className="text-sm text-slate-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-slate-400">
            {Math.floor((Date.now() - new Date(order.created_at)) / 60000)} min ago
          </p>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      {order.table_number && (
        <p className="mt-3 text-sm text-slate-600">Table: {order.table_number}</p>
      )}

      <div className="mt-4 space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-slate-700">
              {item.name} x{item.quantity}
            </span>
            <span className="font-semibold text-slate-900">{item.price * item.quantity} ETB</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-sm font-semibold text-slate-900">Total</span>
        <span className="text-sm font-semibold text-slate-900">{order.total} ETB</span>
      </div>

      <div className="mt-6 space-y-3">
        {order.status === "pending" && (
          <>
            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "accepted");
                setLoading(false);
              }}
              disabled={loading}
              className="w-full rounded-3xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Accept order"}
            </button>
            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "cancelled");
                setLoading(false);
              }}
              disabled={loading}
              className="w-full rounded-3xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
            >
              Cancel order
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
              className="w-full rounded-3xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Mark complete"}
            </button>
            <button
              onClick={async () => {
                setLoading(true);
                await updateStatus(order.id, "cancelled");
                setLoading(false);
              }}
              disabled={loading}
              className="w-full rounded-3xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
            >
              Cancel order
            </button>
          </>
        )}

        {order.status === "completed" && (
          <span className="text-sm text-slate-500">Order completed</span>
        )}

        {order.status === "cancelled" && (
          <span className="text-sm text-rose-600">Order cancelled</span>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
