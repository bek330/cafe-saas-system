import OrderCard from "./OrderCard";

export default function OrderColumn({ title, orders, updateStatus }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {orders.length === 0 ? (
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-slate-500">No orders in this status.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} updateStatus={updateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
