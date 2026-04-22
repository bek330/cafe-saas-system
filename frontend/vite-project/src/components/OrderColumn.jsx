import OrderCard from "./OrderCard";

export default function OrderColumn({ title, orders, updateStatus }) {
  return (
    <div className="bg-gray-100 p-3 rounded">
      <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>

      {orders.map(order => (
        <OrderCard key={order.id} order={order} updateStatus={updateStatus} />
      ))}
    </div>
  );
}