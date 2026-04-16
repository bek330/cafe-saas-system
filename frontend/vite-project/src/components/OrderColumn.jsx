import OrderCard from "./OrderCard";

export default function OrderColumn({ title, orders, updateStatus }) {
  return (
    <div className="bg-gray-100 p-3 rounded">
      <h2 className="font-bold mb-3">{title}</h2>

      {orders.map(order => (
        <OrderCard key={order.id} order={order} updateStatus={updateStatus} />
      ))}
    </div>
  );
}